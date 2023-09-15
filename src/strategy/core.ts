/*
 * @Author: cola
 * @Date: 2023-09-08 15:56:52
 * @LastEditors: cola
 * @Description:
 */
import { resolve } from "pathe";
import fs from "fs-extra";
import { init, initInstall, initCommitPush } from "../utils/init";
import ViteTheme from "./theme/vite";
import NuxtTheme from "./theme/nuxt3";
export default class Strategy {
  path: string;
  name: string;
  constructor(name: string, path: string) {
    this.path = path;
    this.name = name;
  }
  async vite(conf: Record<string, unknown>) {
    const packagePath = resolve(this.path, "./package.json");
    const pkg = await this.pkg(packagePath, conf);

    const features = (conf.features || []) as string[];
    if (!features?.includes?.("theme")) {
      ViteTheme(this.path);
    }
    // 创建远程仓库，初始化 git
    await init(pkg);
    // 重新写入
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));

    await initInstall(pkg.name);
    await initCommitPush(pkg.name);
  }
  async nuxt3(conf: Record<string, unknown>) {
    const packagePath = resolve(this.path, "./package.json");
    const pkg = await this.pkg(packagePath, conf);

    const features = (conf.features || []) as string[];
    if (!features?.includes?.("theme")) {
      NuxtTheme(this.path);
    }
    // 创建远程仓库，初始化 git
    await init(pkg);
    // 重新写入
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));

    await initInstall(pkg.name);
    await initCommitPush(pkg.name);
  }

  async node(conf: Record<string, unknown>) {
    const packagePath = resolve(this.path, "./package.json");
    const pkg = await this.pkg(packagePath, conf);

    // 创建远程仓库，初始化 git
    await init(pkg);
    // 重新写入
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));

    await initInstall(pkg.name);
    await initCommitPush(pkg.name);
  }

  async pkg(packagePath: string, conf: Record<string, unknown>) {
    const { isPrivate, description, license } = conf;
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
