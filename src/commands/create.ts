import { defineCommand } from "citty";
import { consola } from "consola";
import { create } from "../inquirer/create";
import { download } from "../utils/download";
import Strategy from "../strategy/core";
import { cleanupRemoteRepo } from "../utils/init";
import { PROJECT_NAME_REGEX, MESSAGES } from "../constants";

/**
 * 验证项目名称
 * @param name 项目名称
 * @returns 是否有效
 */
function validateProjectName(name: string): boolean {
  return PROJECT_NAME_REGEX.test(name);
}

/**
 * 处理项目名称验证错误
 * @param name 项目名称
 */
function handleValidationError(name?: string) {
  if (!name || name.trim() === "") {
    consola.error(MESSAGES.error.projectName);
    consola.info(MESSAGES.tips.usage);
    consola.info(MESSAGES.tips.example);
  } else {
    consola.error(MESSAGES.error.invalidName);
    consola.info(MESSAGES.tips.validName);
  }
  process.exit(1);
}

export default defineCommand({
  meta: {
    name: "create",
    description:
      "🚀 创建一个新项目\n\n💡 支持的模板:\n\n  • Vue3 - 现代前端开发框架\n\n  • Nuxt3 - Vue.js 全栈框架\n\n  • Node - Node.js 后端服务框架\n\n📝 示例:\n\n  ucli create my-app\n\n  ucli create my-vue-project",
  },
  args: {
    name: {
      type: "positional",
      description: "<project-name>",
      required: false,
    },
  },
  async run({ args }) {
    // 验证项目名称
    const projectName = args.name?.trim();

    if (!projectName || !validateProjectName(projectName)) {
      handleValidationError(args.name);
    }

    // 执行创建流程
    try {
      const conf = await create(projectName);
      const path = await download(projectName, conf);
      if (path && conf?.template) {
        const strategy = new Strategy(projectName, path);
        // @ts-ignore - 动态调用模板方法
        await strategy?.[conf.template]?.(conf);
      }
    } catch (error) {
      // 检查是否是远程仓库同名错误，如果不是则清理远程仓库
      const errorMessage = error?.toString() || "";
      if (!errorMessage.includes("already exists") && !errorMessage.includes("name already exists")) {
        await cleanupRemoteRepo();
      }
      throw error;
    }
  },
});
