import { $ } from "execa";
import { chdir } from "node:process";
import ora from "ora";
import chalk from "chalk";
import { createRepo } from "../api/github";
import { debug } from "./index";
const spinner = ora({
  text: "",
  spinner: "line",
});

export async function init(pkg: Record<string, string>) {
  const sshUrl = await initREPO(pkg);
  if (sshUrl) await initGIT(pkg.name, sshUrl);
}

export async function initREPO(pkg: Record<string, unknown>) {
  try {
    spinner.text = "创建远程仓库";
    spinner.start();
    const auth = await $`git config --global ucli.auth`;
    const res = await createRepo(
      {
        name: pkg.name,
        description: pkg.description,
        homepage: pkg.homepage,
        private: pkg.private,
        license_template: pkg.license,
      },
      auth?.stdout?.toString?.()
    );
    const result = await res?.json();
    const { ssh_url, html_url } = result;
    pkg.homepage = `${html_url}#readme`;
    if (pkg?.repository?.url) pkg.repository.url = html_url;
    if (pkg?.bugs?.url) pkg.bugs.url = `${html_url}/issues`;
    if (ssh_url) {
      spinner.succeed(chalk.green("创建远程仓库成功"));
      return ssh_url;
    } else {
      spinner.fail(chalk.red("远程仓库或已存在"));
      throw new Error("创建远程仓库失败，仓库或已存在");
    }
  } catch (error) {
    spinner.fail(chalk.red("创建远程仓库失败"));
    console.error(error);
    debug(error);
  }
}
export async function initGIT(name: string, sshURL: string) {
  try {
    spinner.text = "git 初始化";
    spinner.start();
    chdir(`./${name}`);
    // Git初始化
    await $`git init`;
    // 切换 main 分支
    await $`git checkout -b main`;
    // 初始化远程仓库
    await $`git remote add origin ${sshURL}`;
    spinner.succeed(chalk.green("git 初始化完成"));
  } catch (error) {
    spinner.fail(chalk.red("git 初始化失败"));
    debug(error);
  } finally {
    chdir(`../`);
  }
}
export async function initInstall(name: string) {
  try {
    spinner.text = "安装依赖";
    spinner.start();
    chdir(`./${name}`);
    await $`pnpm install`;
    spinner.succeed(chalk.green("安装依赖成功"));
  } catch (error) {
    spinner.fail(chalk.red("安装依赖失败"));
    debug(error);
  } finally {
    chdir(`../`);
  }
}
export async function initCommitPush(name: string) {
  try {
    spinner.text = "git 提交推送至远程";
    spinner.start();
    chdir(`./${name}`);
    await $`git add .`;
    // Git提交
    await $`git commit --no-verify --message ${"Initial commit"}`;
    // Git推送到远程仓库
    await $`git config pull.rebase false`;
    await $`git pull origin main --allow-unrelated-histories`;
    // Git推送到远程仓库
    await $`git push origin main`;
    spinner.succeed(chalk.green("git 提交推送至远程成功"));
  } catch (error) {
    spinner.fail(chalk.red("git 提交推送至远程失败"));
    debug(error);
  } finally {
    chdir(`../`);
  }
}
