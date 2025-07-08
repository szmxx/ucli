/**
 * 模板配置管理
 * 统一管理所有模板相关的配置，便于维护和扩展
 */

import { FEATURE_CONFIG, TEMPLATE_COMPONENT_MAP } from "../constants";

/**
 * 基础模板配置接口
 */
export interface BaseTemplateConfig {
  name: string;
  defaultDir: string;
  tar: string;
  features: readonly any[];
  components: readonly string[];
}

/**
 * 模板基础信息配置
 */
export const TEMPLATE_BASE_CONFIG = {
  Vue3: {
    name: "template-vite",
    defaultDir: "vue3-app",
    tar: "https://codeload.github.com/szmxx/template-vite/tar.gz/refs/heads/",
  },
  Nuxt3: {
    name: "template-nuxt3",
    defaultDir: "nuxt3-app",
    tar: "https://codeload.github.com/szmxx/template-nuxt3/tar.gz/refs/heads/",
  },
  Node: {
    name: "template-node",
    defaultDir: "node-app",
    tar: "https://codeload.github.com/szmxx/template-node/tar.gz/refs/heads/",
  },
} as const;

/**
 * 模板功能特性配置
 */
export const TEMPLATE_FEATURES_CONFIG = {
  Vue3: [FEATURE_CONFIG.theme, FEATURE_CONFIG.i18n],
  Nuxt3: [FEATURE_CONFIG.theme, FEATURE_CONFIG.i18n],
  Node: [],
} as const;

/**
 * 生成完整的模板配置
 */
export function createTemplateConfig() {
  const templates = Object.keys(TEMPLATE_BASE_CONFIG) as Array<
    keyof typeof TEMPLATE_BASE_CONFIG
  >;

  return templates.reduce((acc, templateKey) => {
    acc[templateKey] = {
      ...TEMPLATE_BASE_CONFIG[templateKey],
      features: TEMPLATE_FEATURES_CONFIG[templateKey],
      components: TEMPLATE_COMPONENT_MAP[templateKey],
    };
    return acc;
  }, {} as Record<string, BaseTemplateConfig>);
}

/**
 * 导出完整的模板配置映射
 */
export const TemplateMap = createTemplateConfig();
