import BaseTheme from "./base";

/**
 * Vue3 主题处理类
 */
class Vue3Theme extends BaseTheme {
  async removeTheme(): Promise<void> {
    const operations = [
      // 删除主题相关文件
      () => this.removeFile("./src/style/theme/dark.scss"),
      () => this.removeFile("./src/components/DarkToggle.vue"),
      () => this.removeFile("./src/composables/theme.ts"),
      () => this.safeRemoveFile("./src/style/theme/element/dark.scss"),
      
      // 更新样式文件
      () => this.replaceInFile(
        "./src/style/theme/index.scss",
        "@use './dark.scss';",
        ""
      ),
      () => this.safeReplaceInFile(
        "./src/style/theme/element/index.scss",
        "@use './dark.scss';",
        ""
      ),
      () => this.replaceInFile(
        "./src/style/global.scss",
        "@use 'element-plus/theme-chalk/src/dark/css-vars.scss' as *;",
        ""
      ),
      
      // 更新组件文件
      () => this.replaceInFile(
        "./src/views/home/HomePage.vue",
        "<DarkToggle></DarkToggle>",
        ""
      ),
      
      // 更新 HTML 文件
      () => this.replaceInFile(
        "./index.html",
        `    <script>
      const theme = localStorage.getItem('theme')
      if (theme === 'dark') {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      }
    </script>`,
        ""
      ),
    ];

    await this.executeOperations(operations);
  }
}

export default async function theme(base: string) {
  const vue3Theme = new Vue3Theme(base);
  await vue3Theme.removeTheme();
}
