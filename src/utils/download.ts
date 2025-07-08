import { downloadTemplate } from "giget";
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import { $ } from "execa";
import { debug } from "./index";
import { getTemplateInfo, getDefaultDir } from "./template";
import { DOWNLOAD_CONFIG, MESSAGES, GIT_CONFIG_KEY } from "../constants";
import type { CreateConfig } from "../inquirer/create";

const spinner = ora({
  text: chalk.cyan(DOWNLOAD_CONFIG.spinner.text),
  spinner: DOWNLOAD_CONFIG.spinner.type,
  color: DOWNLOAD_CONFIG.spinner.color,
});

/**
 * 创建模板提供者函数
 * @param conf 配置对象
 * @returns 提供者函数
 */
async function makeProviders(conf: CreateConfig) {
  const auth = await $`git config --global ${GIT_CONFIG_KEY}`.catch(() => ({
    stdout: "",
  }));

  const token = auth?.stdout?.toString?.()?.trim() || process.env.GITHUB_TOKEN;

  return (input: string) => {
    const { name, tar } = getTemplateInfo(input, conf);
    return {
      name,
      headers: { authorization: token },
      tar,
    };
  };
}

/**
 * 下载模板
 * @param repoName 项目名称
 * @param conf 配置对象
 * @returns 下载的目录路径
 */
export async function download(repoName: string, conf: CreateConfig) {
  try {
    const templateName = conf?.template as string;
    const dirName = repoName || getDefaultDir(templateName);

    // 检查目录是否存在
    const directoryExists = fs.pathExistsSync(`./${dirName}`);
    if (directoryExists) {
      const res = await inquirer.prompt([
        {
          type: "confirm",
          name: "override",
          message: `${chalk.yellow("⚠️")} 目录 ${chalk.bold(
            dirName
          )} 已存在，是否覆盖?`,
          default: false,
        },
      ]);
      if (res.override) {
        await fs.emptyDir(`./${dirName}`);
      } else {
        // 用户选择不覆盖，退出程序
        console.log(chalk.yellow("❌ 已取消创建项目"));
        process.exit(0);
      }
    }

    // 更新 spinner 文本显示当前模板
    spinner.text = chalk.cyan(
      `🚀 正在下载 ${chalk.bold(templateName)} 模板...`
    );
    spinner.start();

    const themes = await makeProviders(conf);
    const startTime = Date.now();

    const { dir } = await downloadTemplate(`themes:${templateName}`, {
      dir: dirName,
      providers: {
        themes,
      },
      force: true,
      offline: false,
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    spinner.succeed(
      chalk.green(`${MESSAGES.success.download} 耗时 ${duration}s`)
    );
    return dir;
  } catch (error) {
    const errorMessage = (error as Error)?.message || "未知错误";
    debug(errorMessage);

    spinner.fail(chalk.red(`${MESSAGES.error.download} ${errorMessage}`));

    // 提供重试建议
    console.log(chalk.yellow(MESSAGES.tips.retry));
    console.log(chalk.gray(MESSAGES.tips.network));
    console.log(chalk.gray(MESSAGES.tips.retryLater));
    console.log(chalk.gray(MESSAGES.tips.checkTemplate));

    if (errorMessage.includes("timeout") || errorMessage.includes("network")) {
      console.log(chalk.gray(MESSAGES.tips.useProxy));
    }

    // 抛出错误以中断后续流程
    throw error;
  }
}
