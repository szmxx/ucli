import { combineLatest, Subject } from "rxjs";
import { getComponentChoices, getFeatureChoices } from "../config/prompts";
import { CreateConfig } from "../inquirer/create";
class PromptStrategy {
  /**
   * Vue3 模板的提示策略
   */
  _component(
    template: string,
    result: CreateConfig,
    prompts: Subject<unknown>
  ) {
    const compchoices = getComponentChoices(template);
    prompts.next({
      type: "list",
      name: "component",
      message: "请选择需要的组件库",
      choices: compchoices,
    });
    result["component"] = compchoices.find((item) => item.checked)?.name;
  }
  _feature(result: CreateConfig, prompts: Subject<unknown>) {
    const featurechoices = getFeatureChoices();
    prompts.next({
      type: "checkbox",
      name: "features",
      message: "请选择需要的功能特性",
      choices: featurechoices,
    });

    result["features"] = featurechoices
      .filter((item) => item.checked)
      .map((item) => item.value);
  }
  async vue3(result: CreateConfig, prompts: Subject<unknown>) {
    this._component("Vue3", result, prompts);
    this._feature(result, prompts);
  }

  /**
   * Nuxt3 模板的提示策略
   */
  async nuxt3(result: CreateConfig, prompts: Subject<unknown>) {
    this._component("Nuxt3", result, prompts);
    this._feature(result, prompts);
  }

  /**
   * Node 模板的提示策略（无组件选择）
   */
  async node() {
    // Node 模板通常不需要前端组件
  }
}

const promptStrategyInstance = new PromptStrategy();

/**
 * 根据模板类型执行相应的提示策略
 */
export async function promptStrategy(
  result: CreateConfig,
  prompts: Subject<unknown>
) {
  const template = result["template"];
  switch (template) {
    case "Vue3":
      promptStrategyInstance.vue3(result, prompts);
    case "Nuxt3":
      promptStrategyInstance.nuxt3(result, prompts);
    case "Node":
      promptStrategyInstance.node();
    default:
      prompts.complete();
  }
}
