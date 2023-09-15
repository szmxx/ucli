import chalk from "chalk";
import Strategy from "../strategy/prompt";
import inquirer from "inquirer";
import { TemplateList, TemplateMap, LicenseList } from "../config";
import { Subject } from "rxjs";
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
            resolve(result);
            break;
        }
      });

    prompts.next({
      type: "list",
      name: "template",
      choices: TemplateList,
      message: "请选择一个模版",
    });
    prompts.next({
      type: "confirm",
      name: "isPrivate",
      message: "是否私密",
    });
    prompts.next({
      type: "input",
      name: "description",
      message: "请输入项目描述",
    });

    prompts.next({
      type: "list",
      name: "license",
      choices: LicenseList,
      message: "请选择开源协议",
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
          name: "默认" + `（${chalk.yellow(features.join("，"))}）`,
          value: "default",
        },
        {
          name: "选择功能",
          value: "manual",
        },
      ],
      message: "请选择一个预设",
    });
  }
}
