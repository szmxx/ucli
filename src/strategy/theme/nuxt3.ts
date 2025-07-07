import fs from "fs-extra";
import { resolve } from "pathe";
const utils = {
  "./style/theme/dark.scss": async (path: string) => {
    await fs.remove(path);
  },
  "./components/DarkToggle.vue": async (path: string) => {
    await fs.remove(path);
  },
  "./style/theme/element/dark.scss": async (path: string) => {
    const bool = fs.pathExistsSync(path);
    if (bool) await fs.remove(path);
  },
  "./style/theme/index.scss": async (path: string) => {
    let res = await fs.readFile(path, "utf-8");
    // @use "./dark.scss";
    res = res.replace("@use './dark.scss';", "");
    fs.writeFile(path, res);
  },
  "./style/theme/element/index.scss": async (path: string) => {
    const bool = fs.pathExistsSync(path);
    if (bool) {
      let res = await fs.readFile(path, "utf-8");
      // @use "./dark.scss";
      res = res?.replace("@use './dark.scss';", "");
      fs.writeFile(path, res);
    }
  },
  "./components/Footer.vue": async (path: string) => {
    let res = await fs.readFile(path, "utf-8");
    // <DarkToggle />
    res = res.replace("<DarkToggle />", "");
    fs.writeFile(path, res);
  },
  "./nuxt.config.ts": async (path: string) => {
    let res = await fs.readFile(path, "utf-8");
    // @nuxtjs/color-mode
    res = res.replace("'@nuxtjs/color-mode',", "");
    res = res.replace(
      `colorMode: {
    classSuffix: '',
  },`,
      ""
    );
    fs.writeFile(path, res);
  },
  "./package.json": async (path: string) => {
    const data = await fs.readFileSync(path, {
      encoding: "utf-8",
    });
    const packageJSON = JSON.parse(data);
    // @nuxtjs/color-mode
    delete packageJSON.devDependencies["@nuxtjs/color-mode"];
    fs.writeFile(path, JSON.stringify(packageJSON, null, 2));
  },
};

export default async function theme(base: string) {
  for (const [path, cb] of Object.entries(utils)) {
    const _path = resolve(base, path);
    await cb(_path);
  }
}
