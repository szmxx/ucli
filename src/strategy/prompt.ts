import type { Subject } from "rxjs";
import { TemplateMap } from "../config";
import chalk from "chalk";
export default class Strategy {
  vite(prompts: Subject<unknown>) {
    const { components, features } = TemplateMap["vite"];
    const defaults = features.filter((i) => i.default).map((i) => i.value);
    prompts.next({
      type: "list",
      name: "component",
      choices: [
        {
          name: `${chalk.gray("📦")} ${chalk.bold("empty")} - ${chalk.gray(
            "无组件库，纯净模板"
          )}`,
          value: "empty",
          short: "empty",
        },
        {
          name: `${chalk.blue("🎨")} ${chalk.bold(
            "element-plus"
          )} - ${chalk.gray("Vue 3 桌面端组件库")}`,
          value: "element-plus",
          short: "element-plus",
        },
        {
          name: `${chalk.green("📱")} ${chalk.bold("vant")} - ${chalk.gray(
            "Vue 3 移动端组件库"
          )}`,
          value: "vant",
          short: "vant",
        },
        {
          name: `${chalk.magenta("🏗️")} ${chalk.bold("qiankun")} - ${chalk.gray(
            "微前端解决方案"
          )}`,
          value: "qiankun",
          short: "qiankun",
        },
      ],
      message: `${chalk.cyan("🧩")} 请选择组件库:`,
      pageSize: 6,
    });
    prompts.next({
      type: "checkbox",
      name: "features",
      choices: [
        {
          name: `${chalk.yellow("🎨")} ${chalk.bold("主题")} - ${chalk.gray(
            "支持深色/浅色主题切换"
          )}`,
          value: "theme",
          checked: true,
        },
        {
          name: `${chalk.blue("🌍")} ${chalk.bold("多语言")} - ${chalk.gray(
            "国际化支持 (i18n)"
          )}`,
          value: "i18n",
          checked: false,
        },
      ],
      message: `${chalk.magenta("✨")} 请选择功能特性:`,
      pageSize: 5,
    });
  }
  nuxt3(prompts: Subject<unknown>) {
    const { components, features } = TemplateMap["nuxt3"];
    const defaults = features.filter((i) => i.default).map((i) => i.value);
    prompts.next({
      type: "list",
      name: "component",
      choices: [
        {
          name: `${chalk.gray("📦")} ${chalk.bold("empty")} - ${chalk.gray(
            "无组件库，纯净模板"
          )}`,
          value: "empty",
          short: "empty",
        },
        {
          name: `${chalk.blue("🎨")} ${chalk.bold(
            "element-plus"
          )} - ${chalk.gray("Vue 3 桌面端组件库")}`,
          value: "element-plus",
          short: "element-plus",
        },
        {
          name: `${chalk.green("📱")} ${chalk.bold("vant")} - ${chalk.gray(
            "Vue 3 移动端组件库"
          )}`,
          value: "vant",
          short: "vant",
        },
      ],
      message: `${chalk.cyan("🧩")} 请选择组件库:`,
      pageSize: 5,
    });
    prompts.next({
      type: "checkbox",
      name: "features",
      choices: [
        {
          name: `${chalk.yellow("🎨")} ${chalk.bold("主题")} - ${chalk.gray(
            "支持深色/浅色主题切换"
          )}`,
          value: "theme",
          checked: true,
        },
        {
          name: `${chalk.blue("🌍")} ${chalk.bold("多语言")} - ${chalk.gray(
            "国际化支持 (i18n)"
          )}`,
          value: "i18n",
          checked: false,
        },
      ],
      message: `${chalk.magenta("✨")} 请选择功能特性:`,
      pageSize: 5,
    });
  }
  node(prompts: Subject<unknown>) {
    prompts.complete();
  }
}
