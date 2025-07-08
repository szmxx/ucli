import fs from "fs-extra";
import { resolve } from "pathe";

/**
 * 主题处理基类，提供通用的文件操作方法
 */
export default class BaseTheme {
  protected basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  /**
   * 删除文件
   */
  protected async removeFile(relativePath: string): Promise<void> {
    const fullPath = resolve(this.basePath, relativePath);
    await fs.remove(fullPath);
  }

  /**
   * 安全删除文件（检查文件是否存在）
   */
  protected async safeRemoveFile(relativePath: string): Promise<void> {
    const fullPath = resolve(this.basePath, relativePath);
    const exists = fs.pathExistsSync(fullPath);
    if (exists) {
      await fs.remove(fullPath);
    }
  }

  /**
   * 替换文件内容
   */
  protected async replaceInFile(
    relativePath: string,
    searchValue: string | RegExp,
    replaceValue: string
  ): Promise<void> {
    const fullPath = resolve(this.basePath, relativePath);
    let content = await fs.readFile(fullPath, "utf-8");
    content = content.replace(searchValue, replaceValue);
    await fs.writeFile(fullPath, content);
  }

  /**
   * 安全替换文件内容（检查文件是否存在）
   */
  protected async safeReplaceInFile(
    relativePath: string,
    searchValue: string | RegExp,
    replaceValue: string
  ): Promise<void> {
    const fullPath = resolve(this.basePath, relativePath);
    const exists = fs.pathExistsSync(fullPath);
    if (exists) {
      await this.replaceInFile(relativePath, searchValue, replaceValue);
    }
  }

  /**
   * 更新 package.json 依赖
   */
  protected async updatePackageJson(
    relativePath: string,
    updater: (pkg: any) => void
  ): Promise<void> {
    const fullPath = resolve(this.basePath, relativePath);
    const data = await fs.readFileSync(fullPath, { encoding: "utf-8" });
    const packageJSON = JSON.parse(data);
    
    updater(packageJSON);
    
    await fs.writeFile(fullPath, JSON.stringify(packageJSON, null, 2));
  }

  /**
   * 执行主题处理操作
   */
  protected async executeOperations(
    operations: Array<() => Promise<void>>
  ): Promise<void> {
    for (const operation of operations) {
      await operation();
    }
  }
}