import Strategy from "../strategy/prompt";
import inquirer from "inquirer";
import { TemplateList, TemplateMap, LicenseList } from "../config";
import { Subject } from "rxjs";
import chalk from "chalk";
const strategy = new Strategy();
export async function create() {
  return new Promise<Record<string, unknown>>((resolve) => {
    const prompts = new Subject();
    const result: Record<string, unknown> = {};
    inquirer
      .prompt(prompts as any)
      .ui.process.subscribe((res: Record<string, string>) => {
        result[res.name] = res.answer;
        switch (res.name) {
          case "template":
            handleTemp(prompts, result);
            break;
          case "preset":
            if (res.answer === "manual") {
              strategy?.[result["template"] as keyof Strategy]?.(prompts);
            } else {
              handleDefaultPreset(prompts, result);
              resolve(result);
            }
            break;
          case "features":
            prompts.complete();
            resolve(result);
            break;
          case "license":
            if (result["template"] === "node") resolve(result);
            break;
        }
      });

    prompts.next({
      type: "list",
      name: "template",
      choices: [
        {
          name: `${chalk.cyan("⚡")} ${chalk.bold("vite")} - ${chalk.gray(
            "现代前端开发框架，快速热重载"
          )}`,
          value: "vite",
          short: "vite",
        },
        {
          name: `${chalk.green("🚀")} ${chalk.bold("nuxt3")} - ${chalk.gray(
            "Vue.js 全栈框架，SSR/SSG 支持"
          )}`,
          value: "nuxt3",
          short: "nuxt3",
        },
        {
          name: `${chalk.yellow("📦")} ${chalk.bold("node")} - ${chalk.gray(
            "Node.js 后端服务框架"
          )}`,
          value: "node",
          short: "node",
        },
      ],
      message: `${chalk.magenta("🎯")} 请选择一个模版:`,
      pageSize: 10,
    });
    prompts.next({
      type: "confirm",
      name: "isPrivate",
      message: `${chalk.blue("🔒")} 是否设置为私有项目?`,
      default: false,
    });
    prompts.next({
      type: "input",
      name: "description",
      message: `${chalk.cyan("📝")} 请输入项目描述:`,
      default: "一个基于模板创建的项目",
    });

    prompts.next({
      type: "list",
      name: "license",
      choices: [
        {
          name: `${chalk.green("📄")} ${chalk.bold("MIT")} - ${chalk.gray(
            "最宽松的开源协议，允许商业使用"
          )}`,
          value: "mit",
          short: "MIT",
        },
        {
          name: `${chalk.blue("📋")} ${chalk.bold("Apache 2.0")} - ${chalk.gray(
            "企业友好，包含专利授权"
          )}`,
          value: "apache-2.0",
          short: "Apache 2.0",
        },
        {
          name: `${chalk.yellow("📜")} ${chalk.bold("GPL 3.0")} - ${chalk.gray(
            "强制开源，病毒式传播"
          )}`,
          value: "gpl-3.0",
          short: "GPL 3.0",
        },
        {
          name: `${chalk.cyan("📃")} ${chalk.bold("LGPL 3.0")} - ${chalk.gray(
            "库友好的 GPL 变体"
          )}`,
          value: "lgpl-3.0",
          short: "LGPL 3.0",
        },
        {
          name: `${chalk.magenta("📑")} ${chalk.bold(
            "BSD 4-Clause"
          )} - ${chalk.gray("经典的 BSD 许可证")}`,
          value: "bsd-4-clause",
          short: "BSD 4-Clause",
        },
        {
          name: `${chalk.red("📄")} ${chalk.bold("MPL 2.0")} - ${chalk.gray(
            "Mozilla 公共许可证"
          )}`,
          value: "mpl-2.0",
          short: "MPL 2.0",
        },
        {
          name: `${chalk.green("📝")} ${chalk.bold(
            "CC BY-SA 4.0"
          )} - ${chalk.gray("知识共享署名-相同方式共享")}`,
          value: "cc-by-sa-4.0",
          short: "CC BY-SA 4.0",
        },
      ],
      message: `${chalk.yellow("⚖️")} 请选择开源协议:`,
      pageSize: 8,
    });
  });
}

function handleDefaultPreset(
  prompts: Subject<unknown>,
  result: Record<string, unknown>
) {
  const features = TemplateMap[
    result["template"] as keyof typeof TemplateMap
  ].features
    .filter((i) => i.default)
    .map((i) => i.value);
  result["features"] = features;
  prompts.complete();
}

function handleTemp(
  prompts: Subject<unknown>,
  result: Record<string, unknown>
) {
  const features = TemplateMap[
    result["template"] as keyof typeof TemplateMap
  ].features
    .filter((i) => i.default)
    .map((i) => i.name);

  if (features?.length) {
    prompts?.next({
      type: "list",
      name: "preset",
      choices: [
        {
          name: `${chalk.green("✨")} ${chalk.bold("默认配置")} ${chalk.gray(
            `（${features.join("、")}）`
          )}`,
          value: "default",
          short: "默认配置",
        },
        {
          name: `${chalk.blue("🔧")} ${chalk.bold("自定义配置")} ${chalk.gray(
            "- 手动选择功能"
          )}`,
          value: "manual",
          short: "自定义配置",
        },
      ],
      message: `${chalk.cyan("⚙️")} 请选择配置方式:`,
    });
  }
}
