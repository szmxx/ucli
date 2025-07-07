import fs from "fs-extra";
import { resolve } from "pathe";
const utils = {
  "./src/style/theme/dark.scss": async (path: string) => {
    await fs.remove(path);
  },
  "./src/components/DarkToggle.vue": async (path: string) => {
    await fs.remove(path);
  },
  "./src/composables/theme.ts": async (path: string) => {
    await fs.remove(path);
  },
  "./src/style/theme/element/dark.scss": async (path: string) => {
    const bool = fs.pathExistsSync(path);
    if (bool) await fs.remove(path);
  },
  "./src/style/theme/index.scss": async (path: string) => {
    let res = await fs.readFile(path, "utf-8");
    res = res.replace("@use './dark.scss';", "");
    fs.writeFile(path, res);
  },
  "./src/style/theme/element/index.scss": async (path: string) => {
    const bool = fs.pathExistsSync(path);
    if (bool) {
      let res = await fs.readFile(path, "utf-8");
      // @use "./dark.scss";
      res = res?.replace("@use './dark.scss';", "");
      fs.writeFile(path, res);
    }
  },
  "./src/style/global.scss": async (path: string) => {
    let res = await fs.readFile(path, "utf-8");
    // element-plus/theme-chalk/src/dark/css-vars.scss
    res = res?.replace(
      "@use 'element-plus/theme-chalk/src/dark/css-vars.scss' as *;",
      ""
    );
    fs.writeFile(path, res);
  },

  "./src/views/home/HomePage.vue": async (path: string) => {
    let res = await fs.readFile(path, "utf-8");
    res = res.replace("<DarkToggle></DarkToggle>", "");
    fs.writeFile(path, res);
  },
  "./index.html": async (path: string) => {
    let res = await fs.readFile(path, "utf-8");
    res = res.replace(
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
    );
    fs.writeFile(path, res);
  },
};

export default async function theme(base: string) {
  for (const [path, cb] of Object.entries(utils)) {
    const _path = resolve(base, path);
    await cb(_path);
  }
}
