import { downloadTemplate } from "giget";
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import { TemplateMap } from "../config";
import { TemplateType } from "../types";
import { $ } from "execa";
import { debug } from "./index";

const spinner = ora({
  text: chalk.cyan("🚀 正在下载模板..."),
  spinner: "dots12",
  color: "cyan",
});

function getRepoBranchName(conf: Record<string, unknown>) {
  const features = (conf.features || []) as string[];
  const component = (
    conf.component !== "empty" ? conf.component : ""
  ) as string;
  let refName = "main";
  if (features.includes("i18n")) {
    refName = component ? `${component}-i18n` : "i18n";
  } else {
    if (component) {
      refName = component;
    }
  }
  return refName;
}

async function makeProviders(conf: Record<string, unknown>) {
  const refName = getRepoBranchName(conf);
  const auth = await $`git config --global ucli.auth`;
  return (input: string) => {
    const { name, tar } = TemplateMap?.[input as TemplateType];
    return {
      name: name,
      headers: { authorization: auth?.stdout?.toString() },
      tar: tar + refName,
    };
  };
}

export async function download(
  repoName: string,
  conf: Record<string, unknown>
) {
  try {
    const templateName = conf?.template as string;
    const { defaultDir = "" } = TemplateMap?.[templateName as TemplateType];

    const dirName = repoName || defaultDir;

    // 强制覆盖
    const bool = fs.pathExistsSync(`./${dirName}`);
    if (bool) {
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
      // 启用并发下载以提升速度
      force: true,
      offline: false,
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    spinner.succeed(chalk.green(`✅ 模板下载完成! 耗时 ${duration}s`));
    return dir;
  } catch (error) {
    const errorMessage = (error as Error)?.message || "未知错误";
    debug(errorMessage);

    spinner.fail(chalk.red(`❌ 下载失败: ${errorMessage}`));

    // 提供重试建议
    console.log(chalk.yellow("💡 建议:"));
    console.log(chalk.gray("  • 检查网络连接"));
    console.log(chalk.gray("  • 稍后重试"));
    console.log(chalk.gray("  • 确认模板名称是否正确"));

    if (errorMessage.includes("timeout") || errorMessage.includes("network")) {
      console.log(chalk.gray("  • 尝试使用代理或切换网络环境"));
    }
  }
}
