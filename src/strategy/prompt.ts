/*
 * @Author: cola
 * @Date: 2023-09-08 15:56:30
 * @LastEditors: cola
 * @Description:
 */

import type { Subject } from "rxjs";
import { TemplateMap } from "../config";
export default class Strategy {
  vite(prompts: Subject<unknown>) {
    const { components, features } = TemplateMap["vite"];
    const defaults = features.filter((i) => i.default).map((i) => i.value);
    prompts.next({
      type: "list",
      name: "component",
      choices: components,
      message: "请选择组件库",
    });
    prompts.next({
      type: "checkbox",
      name: "features",
      choices: features,
      message: "请选择功能列表",
      default: defaults,
    });
  }
  nuxt3(prompts: Subject<unknown>) {
    const { components, features } = TemplateMap["nuxt3"];
    const defaults = features.filter((i) => i.default).map((i) => i.value);
    prompts.next({
      type: "list",
      name: "component",
      choices: components,
      message: "请选择组件库",
    });
    prompts.next({
      type: "checkbox",
      name: "features",
      choices: features,
      message: "请选择功能列表",
      default: defaults,
    });
  }
}
