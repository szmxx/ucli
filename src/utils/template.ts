import { TemplateMap } from "../config/templates";
import type { CreateConfig } from "../inquirer/create";

/**
 * 根据配置生成仓库分支名称
 * @param conf 配置对象
 * @returns 分支名称
 */
export function getRepoBranchName(conf: CreateConfig): string {
  const features = conf.features || [];
  const component = conf.component;

  let refName = "main";

  if (features.includes("i18n")) {
    refName = component ? `${component}-i18n` : "i18n";
  } else if (component) {
    refName = component;
  }

  return refName;
}

/**
 * 获取模板信息
 * @param templateName 模板名称
 * @param conf 配置对象
 * @returns 模板信息
 */
export function getTemplateInfo(templateName: string, conf: CreateConfig) {
  const { name, tar } = TemplateMap?.[templateName];
  const refName = getRepoBranchName(conf);

  return {
    name,
    tar: tar + refName,
  };
}

/**
 * 获取默认目录名
 * @param templateName 模板名称
 * @returns 默认目录名
 */
export function getDefaultDir(templateName: string): string {
  const { defaultDir = "" } = TemplateMap?.[templateName];
  return defaultDir;
}
