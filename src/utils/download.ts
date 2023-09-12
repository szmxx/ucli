/*
 * @Author: cola
 * @Date: 2023-09-08 11:25:12
 * @LastEditors: cola
 * @Description:
 */
import { downloadTemplate } from "giget";
import ora from "ora";
import chalk from "chalk";
import { consola } from "consola";
import inquirer from "inquirer";
import fs from "fs-extra";
import { TemplateMap } from "../config";
import { TemplateType } from "../types";
import { $ } from "execa";
const spinner = ora({
  text: "下载模版中",
  spinner: "line",
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

export async function download(
  repoName: string,
  conf: Record<string, unknown>
) {
  try {
    const templateName = conf?.template as string;
    const refName = getRepoBranchName(conf);
    const {
      username = "szmxx",
      provider = "github",
      name,
      defaultDir = "",
    } = TemplateMap?.[templateName as TemplateType];

    const dirName = repoName || defaultDir;
    // 强制覆盖
    const bool = fs.pathExistsSync(`./${dirName}`);
    if (bool) {
      const res = await inquirer.prompt([
        {
          type: "confirm",
          name: "override",
          message: "目录已存在，是否选择覆盖",
        },
      ]);
      if (res.override) {
        await fs.emptyDir(`./${dirName}`);
      }
    }
    spinner.start();
    const auth = await $`git config --global ucli.auth`;
    const { dir } = await downloadTemplate(
      `${provider}:${username}/${name}#${refName}`,
      {
        auth: auth?.stdout?.toString(),
        dir: dirName,
      }
    );
    spinner.succeed(chalk.green("下载完成"));
    return dir;
  } catch (error) {
    consola.error((error as Error)?.message);
    spinner.fail(chalk.red("下载失败"));
  }
}
