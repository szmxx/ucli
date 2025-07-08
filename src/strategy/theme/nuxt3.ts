import BaseTheme from "./base";

/**
 * Nuxt3 主题处理类
 */
class Nuxt3Theme extends BaseTheme {
  async removeTheme(): Promise<void> {
    const operations = [
      // 删除主题相关文件
      () => this.removeFile("./style/theme/dark.scss"),
      () => this.removeFile("./components/DarkToggle.vue"),
      () => this.safeRemoveFile("./style/theme/element/dark.scss"),

      // 更新样式文件
      () =>
        this.replaceInFile(
          "./style/theme/index.scss",
          "@use './dark.scss';",
          ""
        ),
      () =>
        this.safeReplaceInFile(
          "./style/theme/element/index.scss",
          "@use './dark.scss';",
          ""
        ),

      // 更新组件文件
      () => this.replaceInFile("./components/Footer.vue", "<DarkToggle />", ""),

      // 更新 Nuxt 配置
      () => this.replaceInFile("./nuxt.config.ts", "'@nuxtjs/color-mode',", ""),
      () =>
        this.replaceInFile(
          "./nuxt.config.ts",
          `colorMode: {
    classSuffix: '',
  },`,
          ""
        ),

      // 更新 package.json
      () =>
        this.updatePackageJson("./package.json", (pkg) => {
          delete pkg.devDependencies?.["@nuxtjs/color-mode"];
        }),
    ];

    await this.executeOperations(operations);
  }
}

export default async function theme(base: string) {
  const nuxt3Theme = new Nuxt3Theme(base);
  await nuxt3Theme.removeTheme();
}
