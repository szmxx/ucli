import BaseStrategy from "./base";
import VueTheme from "./theme/vue3";
import NuxtTheme from "./theme/nuxt3";
import type { CreateConfig } from "../inquirer/create";

/**
 * 项目策略类，继承基础策略类
 */
export default class Strategy extends BaseStrategy {
  /**
   * Vue3 项目初始化
   */
  async Vue3(conf: CreateConfig) {
    await this.executeStrategy(conf, VueTheme);
  }

  /**
   * Nuxt3 项目初始化
   */
  async Nuxt3(conf: CreateConfig) {
    await this.executeStrategy(conf, NuxtTheme);
  }

  /**
   * Node 项目初始化
   */
  async Node(conf: CreateConfig) {
    await this.executeStrategy(conf);
  }
}
