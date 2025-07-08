import chalk from "chalk";
import {
  COMPONENT_CONFIG,
  FEATURE_CONFIG,
  TEMPLATE_COMPONENT_MAP,
  TEMPLATE_CONFIG,
  SUPPORTED_TEMPLATES,
  LICENSE_CONFIG,
  SUPPORTED_LICENSES,
} from "../constants";

// UI 样式配置
export const UI_STYLES = {
  icons: {
    components: "🧩",
    features: "⚡",
  },
  colors: {
    blue: chalk.blue,
    green: chalk.green,
    yellow: chalk.yellow,
    cyan: chalk.cyan,
    gray: chalk.gray,
    bold: chalk.bold,
    magenta: chalk.magenta,
  },
};

/**
 * 根据组件配置生成选择项
 */
function createComponentChoice(componentKey: keyof typeof COMPONENT_CONFIG) {
  const config = COMPONENT_CONFIG[componentKey];
  const colorMap = {
    empty: UI_STYLES.colors.gray,
    "element-plus": UI_STYLES.colors.blue,
    vant: UI_STYLES.colors.green,
    qiankun: UI_STYLES.colors.magenta,
  };

  const color = colorMap[componentKey] || UI_STYLES.colors.gray;

  return {
    name: `${color(config.icon)} ${UI_STYLES.colors.bold(config.displayName)}${
      config.description
        ? ` - ${UI_STYLES.colors.gray(config.description)}`
        : ""
    }`,
    value: componentKey,
    short: componentKey,
    checked: config.default,
  };
}

/**
 * 根据功能配置生成选择项
 */
function createFeatureChoice(featureKey: keyof typeof FEATURE_CONFIG) {
  const config = FEATURE_CONFIG[featureKey];
  const colorMap = {
    theme: UI_STYLES.colors.yellow,
    i18n: UI_STYLES.colors.blue,
  };

  const color = colorMap[featureKey] || UI_STYLES.colors.gray;

  return {
    name: `${color(config.icon)} ${UI_STYLES.colors.bold(
      config.name
    )} - ${UI_STYLES.colors.gray(config.description)}`,
    value: featureKey,
    checked: config.default,
  };
}

/**
 * 根据模板配置生成选择项
 */
function createTemplateChoice(templateKey: keyof typeof TEMPLATE_CONFIG) {
  const config = TEMPLATE_CONFIG[templateKey];
  const colorMap = {
    Vue3: UI_STYLES.colors.cyan,
    Nuxt3: UI_STYLES.colors.green,
    Node: UI_STYLES.colors.blue,
  };

  const color = colorMap[templateKey] || UI_STYLES.colors.gray;

  return {
    name: `${color(config.icon)} ${UI_STYLES.colors.bold(
      config.name
    )} - ${UI_STYLES.colors.gray(config.description)}`,
    value: templateKey,
    short: config.name,
  };
}

/**
 * 根据模板类型获取组件选择项
 */
export function getComponentChoices(template: string) {
  const templateKey = template as keyof typeof TEMPLATE_COMPONENT_MAP;
  const supportedComponents = TEMPLATE_COMPONENT_MAP[templateKey] || [];

  return supportedComponents.map((componentKey) =>
    createComponentChoice(componentKey as keyof typeof COMPONENT_CONFIG)
  );
}

/**
 * 获取功能特性选择项
 */
export function getFeatureChoices() {
  return Object.keys(FEATURE_CONFIG).map((featureKey) =>
    createFeatureChoice(featureKey as keyof typeof FEATURE_CONFIG)
  );
}

/**
 * 根据开源协议配置生成选择项
 */
function createLicenseChoice(licenseKey: keyof typeof LICENSE_CONFIG) {
  const config = LICENSE_CONFIG[licenseKey];
  const colorMap = {
    MIT: UI_STYLES.colors.green,
    "Apache-2.0": UI_STYLES.colors.blue,
    "GPL-3.0": UI_STYLES.colors.yellow,
    "LGPL-3.0": UI_STYLES.colors.cyan,
    "MPL-2.0": UI_STYLES.colors.magenta,
    custom: UI_STYLES.colors.green,
  };

  const color = colorMap[licenseKey] || UI_STYLES.colors.gray;

  return {
    name: `${color(config.icon)} ${UI_STYLES.colors.bold(
      config.name
    )} - ${UI_STYLES.colors.gray(config.displayName.split(" - ")[1])}`,
    value: config.name,
    short: config.name,
  };
}

/**
 * 获取模板选择项
 */
export function getTemplateChoices() {
  return SUPPORTED_TEMPLATES.map((templateKey) =>
    createTemplateChoice(templateKey as keyof typeof TEMPLATE_CONFIG)
  );
}

/**
 * 获取开源协议选择项
 */
export function getLicenseChoices() {
  return SUPPORTED_LICENSES.map((licenseKey) =>
    createLicenseChoice(licenseKey as keyof typeof LICENSE_CONFIG)
  );
}
