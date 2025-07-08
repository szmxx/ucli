import inquirer from "inquirer";
import chalk from "chalk";
import { getTemplateChoices, getLicenseChoices } from "../config/prompts";
import { promptStrategy } from "../strategy/prompt";
import { Subject } from "rxjs";

// UI 样式配置
const UI_STYLES = {
  icons: {
    target: "🎯",
    lock: "🔒",
    edit: "📝",
    balance: "⚖️",
    sparkles: "✨",
    wrench: "🔧",
    gear: "⚙️",
  },
  colors: {
    cyan: chalk.cyan,
    blue: chalk.blue,
    yellow: chalk.yellow,
    green: chalk.green,
    red: chalk.red,
    gray: chalk.gray,
    bold: chalk.bold,
  },
};

export interface CreateConfig {
  template?: string;
  name?: string;
  description?: string;
  license?: string;
  private?: boolean;
  component?: string;
  features?: string[];
}

export async function create(name: string): Promise<CreateConfig> {
  const prompts = new Subject();
  const result: CreateConfig = {};
  return new Promise((resolve) => {
    inquirer
      .prompt(prompts as any)
      .ui.process.subscribe((res: Record<string, string>) => {
        (result as Record<string, unknown>)[res.name] = res.answer;
        switch (res.name) {
          case "template":
            initPresets(prompts);
            break;
          case "preset":
            if (res.answer === "manual") {
              promptStrategy(result, prompts);
            } else {
              prompts.complete();
              resolve(result);
            }
            break;
          case "license":
            if (result.template === "Node") {
              prompts.complete();
              resolve(result);
            }
            break;
          case "features":
            prompts.complete();
            resolve(result);
            break;
        }
      });

    initQuestionList(prompts, name);
  });
}

function initQuestionList(prompts: Subject<unknown>, name: string) {
  const templateChoices = getTemplateChoices();

  const questions = [
    {
      type: "list",
      name: "template",
      message: `${UI_STYLES.colors.cyan(
        UI_STYLES.icons.target
      )} 请选择项目模板:`,
      choices: templateChoices,
    },
    {
      type: "confirm",
      name: "private",
      message: `${UI_STYLES.colors.blue(
        UI_STYLES.icons.lock
      )} 是否设置为私有项目?`,
      default: false,
    },
    {
      type: "input",
      name: "description",
      message: `${UI_STYLES.colors.cyan(UI_STYLES.icons.edit)} 请输入项目描述:`,
      default: `A ${name || "Template"} project`,
    },
    {
      type: "list",
      name: "license",
      message: `${UI_STYLES.colors.yellow(
        UI_STYLES.icons.balance
      )} 请选择开源协议:`,
      choices: getLicenseChoices(),
      default: "MIT",
    },
  ];

  questions.map((question) => {
    prompts.next(question);
  });
}

function initPresets(prompts: Subject<unknown>) {
  prompts.next({
    type: "list",
    name: "preset",
    message: `${UI_STYLES.colors.cyan(UI_STYLES.icons.gear)} 请选择配置方式:`,
    choices: [
      {
        name: `${UI_STYLES.colors.green(
          UI_STYLES.icons.sparkles
        )} ${UI_STYLES.colors.bold("默认配置")} ${UI_STYLES.colors.gray(
          "(推荐) 使用预设的最佳实践配置"
        )}`,
        value: "default",
        short: "默认配置",
      },
      {
        name: `${UI_STYLES.colors.blue(
          UI_STYLES.icons.wrench
        )} ${UI_STYLES.colors.bold("自定义配置")} ${UI_STYLES.colors.gray(
          "手动选择组件和功能"
        )}`,
        value: "manual",
        short: "自定义配置",
      },
    ],
    default: "default",
  });
}
