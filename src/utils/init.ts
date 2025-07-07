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
  let sshUrl = "";
  try {
    sshUrl = await initREPO(pkg);
  } catch (error) {
    // 如果创建远程仓库失败，继续执行本地 git 初始化
    console.log(chalk.yellow("⚠️ 远程仓库创建失败，将继续进行本地初始化"));
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
      console.log(
        chalk.yellow("💡 提示: 未配置 GitHub Token，跳过远程仓库创建")
      );
      console.log(chalk.gray("   可通过以下方式配置:"));
      console.log(
        chalk.gray("   • git config --global ucli.auth 'your_token'")
      );
      console.log(chalk.gray("   • export GITHUB_TOKEN='your_token'"));
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
      spinner.succeed(chalk.green("✅ 创建远程仓库成功"));
      return ssh_url;
    } else {
      if (message === "Bad credentials") {
        spinner.fail(chalk.red("❌ 授权失败"));
        console.log(chalk.yellow("💡 建议:"));
        console.log(chalk.gray("   • 检查 GitHub Token 是否有效"));
        console.log(chalk.gray("   • 确认 Token 具有 repo 权限"));
        console.log(chalk.gray("   • 重新生成并配置新的 Token"));
        throw new Error("授权失败，请检查权限");
      }
      if (message?.includes("name already exists")) {
        spinner.fail(chalk.red("❌ 仓库名称已存在"));
        console.log(chalk.yellow("💡 建议: 尝试使用不同的项目名称"));
        throw new Error("仓库名称已存在");
      }
      spinner.fail(chalk.red("❌ 创建远程仓库失败"));
      throw new Error(`创建失败: ${message || "未知错误"}`);
    }
  } catch (error) {
    if (spinner.isSpinning) {
      spinner.fail(chalk.red("❌ 创建远程仓库失败"));
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
      spinner.succeed(chalk.green("✅ Git 初始化完成（已关联远程仓库）"));
    } else {
      spinner.succeed(chalk.green("✅ Git 初始化完成（仅本地仓库）"));
    }
  } catch (error) {
    spinner.fail(chalk.red("❌ Git 初始化失败"));
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
    spinner.succeed(chalk.green("✅ 依赖安装完成"));
  } catch (error) {
    spinner.fail(chalk.red("❌ 依赖安装失败"));
    console.log(chalk.yellow("💡 建议:"));
    console.log(chalk.gray("   • 检查网络连接"));
    console.log(chalk.gray("   • 尝试使用 npm install 或 yarn install"));
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
      console.log(chalk.yellow("⚠️ 未配置远程仓库，跳过推送步骤"));
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
    spinner.succeed(chalk.green("✅ 代码已提交并推送到远程仓库"));
  } catch (error) {
    spinner.fail(chalk.red("❌ 提交推送失败"));
    console.log(chalk.yellow("💡 建议:"));
    console.log(chalk.gray("   • 检查网络连接"));
    console.log(chalk.gray("   • 确认远程仓库访问权限"));
    console.log(chalk.gray("   • 稍后可手动执行: git push origin main"));
    debug(error);
    // 不抛出错误，允许项目创建继续完成
  } finally {
    chdir(`../`);
  }
}
