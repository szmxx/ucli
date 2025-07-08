import { $ } from "execa";
import { chdir } from "node:process";
import ora from "ora";
import chalk from "chalk";
import { createRepo } from "../api/github";
import { debug } from "./index";
import { DOWNLOAD_CONFIG, MESSAGES } from "../constants";
const spinner = ora({
  text: chalk.cyan("🚀 正在初始化项目..."),
  spinner: DOWNLOAD_CONFIG.spinner.type,
  color: DOWNLOAD_CONFIG.spinner.color,
});

export async function init(pkg: Record<string, string>) {
  let sshUrl = "";
  try {
    sshUrl = await initREPO(pkg);
  } catch (error) {
    // 如果创建远程仓库失败，继续执行本地 git 初始化
    console.log(chalk.yellow(MESSAGES.warning.repoCreateSkipped));
  }
  await initGIT(pkg.name, sshUrl || "");
  return sshUrl;
}

export async function initREPO(pkg: Record<string, unknown>) {
  try {
    // 检查授权配置
    const auth = await $`git config --global ucli.auth`.catch(() => ({
      stdout: "",
    }));
    const token =
      auth?.stdout?.toString?.()?.trim() || process.env.GITHUB_TOKEN;

    if (!token) {
      console.log(chalk.yellow(MESSAGES.tips.tokenConfig));
    console.log(chalk.gray(MESSAGES.tips.tokenConfigMethods));
    console.log(chalk.gray(MESSAGES.tips.tokenConfigGit));
    console.log(chalk.gray(MESSAGES.tips.tokenConfigEnv));
      throw new Error("未配置授权信息");
    }

    spinner.text = "创建远程仓库";
    spinner.start();

    const res = await createRepo(
      {
        name: pkg.name,
        description: pkg.description,
        homepage: pkg.homepage,
        private: pkg.private,
        license_template: pkg.license,
      },
      token
    );
    const result = await res?.json();
    const { ssh_url, html_url, message } = result;
    pkg.homepage = `${html_url}#readme`;
    if (
      typeof pkg.repository === "object" &&
      pkg.repository &&
      "url" in pkg.repository
    ) {
      pkg.repository.url = html_url;
    }
    if (typeof pkg.bugs === "object" && pkg.bugs && "url" in pkg.bugs)
      pkg.bugs.url = `${html_url}/issues`;
    if (ssh_url) {
      spinner.succeed(chalk.green(MESSAGES.success.repoCreated));
      return ssh_url;
    } else {
      if (message === "Bad credentials") {
        spinner.fail(chalk.red(MESSAGES.error.authFailed));
      console.log(chalk.yellow(MESSAGES.tips.retry));
      console.log(chalk.gray(MESSAGES.tips.checkToken));
      console.log(chalk.gray(MESSAGES.tips.checkPermission));
      console.log(chalk.gray(MESSAGES.tips.regenerateToken));
        throw new Error("授权失败，请检查权限");
      }
      if (message?.includes("name already exists")) {
        spinner.fail(chalk.red(MESSAGES.error.repoExists));
      console.log(chalk.yellow(MESSAGES.tips.tryDifferentName));
        throw new Error("仓库名称已存在");
      }
      spinner.fail(chalk.red(MESSAGES.error.repoCreateFailed));
      throw new Error(`创建失败: ${message || "未知错误"}`);
    }
  } catch (error) {
    if (spinner.isSpinning) {
      spinner.fail(chalk.red(MESSAGES.error.repoCreateFailed));
    }
    debug(error);
    throw error;
  }
}
export async function initGIT(name: string, sshURL: string) {
  try {
    spinner.text = "🔧 初始化 Git 仓库";
    spinner.start();
    chdir(`./${name}`);

    // Git初始化
    await $`git init`;
    // 切换 main 分支
    await $`git checkout -b main`;

    if (sshURL) {
      // 初始化远程仓库
      await $`git remote add origin ${sshURL}`;
      spinner.succeed(chalk.green(MESSAGES.success.gitInit));
    } else {
      spinner.succeed(chalk.green(MESSAGES.success.gitInitLocal));
    }
  } catch (error) {
    spinner.fail(chalk.red(MESSAGES.error.gitInitFailed));
    debug(error);
    throw error;
  } finally {
    chdir(`../`);
  }
}
export async function initInstall(name: string) {
  try {
    spinner.text = "📦 安装项目依赖";
    spinner.start();
    chdir(`./${name}`);
    await $`pnpm install`;
    spinner.succeed(chalk.green(MESSAGES.success.depsInstalled));
  } catch (error) {
    spinner.fail(chalk.red(MESSAGES.error.depsInstallFailed));
    console.log(chalk.yellow(MESSAGES.tips.retry));
    console.log(chalk.gray(MESSAGES.tips.network));
    console.log(chalk.gray(MESSAGES.tips.manualInstall));
    debug(error);
    throw error;
  } finally {
    chdir(`../`);
  }
}
export async function initCommitPush(name: string) {
  try {
    // 检查是否有远程仓库
    chdir(`./${name}`);
    const remotes = await $`git remote`.catch(() => ({ stdout: "" }));
    if (!remotes.stdout.toString().trim()) {
      console.log(chalk.yellow(MESSAGES.warning.noToken));
      return;
    }

    spinner.text = "🚀 提交并推送到远程仓库";
    spinner.start();

    await $`git add .`;
    // Git提交
    await $`git commit --no-verify --message ${"Initial commit"}`;
    // Git推送到远程仓库
    await $`git config pull.rebase false`;
    await $`git pull origin main --allow-unrelated-histories`.catch(() => {
      // 如果远程仓库为空，pull 可能会失败，这是正常的
    });
    // Git推送到远程仓库
    await $`git push origin main`;
    spinner.succeed(chalk.green(MESSAGES.success.codePushed));
  } catch (error) {
    spinner.fail(chalk.red(MESSAGES.error.pushFailed));
    console.log(chalk.yellow(MESSAGES.tips.retry));
    console.log(chalk.gray(MESSAGES.tips.network));
    console.log(chalk.gray(MESSAGES.tips.checkRepoAccess));
    console.log(chalk.gray(MESSAGES.tips.manualPush));
    debug(error);
    // 不抛出错误，允许项目创建继续完成
  } finally {
    chdir(`../`);
  }
}
