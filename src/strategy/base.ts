import fs from "fs-extra";
import { resolve } from "pathe";
import { init, initInstall, initCommitPush } from "../utils/init";
import type { CreateConfig } from "../inquirer/create";

/**
 * 基础策略类，包含通用的项目初始化逻辑
 */
export default class BaseStrategy {
  protected path: string;
  protected name: string;

  constructor(name: string, path: string) {
    this.path = path;
    this.name = name;
  }

  /**
   * 通用的项目初始化流程
   * @param conf 配置对象
   * @param themeHandler 主题处理函数（可选）
   */
  protected async executeStrategy(
    conf: CreateConfig,
    themeHandler?: (path: string) => Promise<void>
  ) {
    const packagePath = resolve(this.path, "./package.json");
    const pkg = await this._updatePackageJson(packagePath, conf);

    // 处理主题功能
    const features = conf.features || [];
    if (!features?.includes?.("theme") && themeHandler) {
      await themeHandler(this.path);
    }

    // 创建远程仓库，初始化 git
    const sshUrl = await init(pkg);

    // 重新写入 package.json
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));

    // 安装依赖和提交代码
    await initInstall(pkg.name);
    if (sshUrl) await initCommitPush(pkg.name);
  }

  /**
   * 更新 package.json 文件
   * @param packagePath package.json 文件路径
   * @param conf 配置对象
   * @returns 更新后的 package.json 对象
   */
  protected async _updatePackageJson(packagePath: string, conf: CreateConfig) {
    const { private: isPrivate, description, license } = conf;
    const data = await fs.readFileSync(packagePath, {
      encoding: "utf-8",
    });
    const packageJSON = JSON.parse(data);

    packageJSON.name = this.name;
    if (typeof license === "string")
      packageJSON.license = license?.toUpperCase?.();
    if (description) packageJSON.description = description;
    packageJSON.private = isPrivate;

    return packageJSON;
  }
}
