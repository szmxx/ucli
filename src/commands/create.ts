import { defineCommand } from "citty";
import { consola } from "consola";
import { create } from "../inquirer/create";
import { download } from "../utils/download";
import Strategy from "../strategy/core";
export default defineCommand({
  meta: {
    name: "create",
    description: "🚀 创建一个新项目\n\n💡 支持的模板:\n  • vite - 现代前端开发框架\n  • nuxt3 - Vue.js 全栈框架\n\n📝 示例:\n  ucli create my-app\n  ucli create my-vue-project",
  },
  args: {
    name: {
      type: "positional",
      description: "<project-name>",
      required: false,
    },
  },
  async run({ args }) {
    // 检查项目名称参数
    if (!args.name || args.name.trim() === '') {
      consola.error('🚫 请提供项目名称');
      consola.info('💡 使用方法: ucli create <项目名称>');
      consola.info('📝 示例: ucli create my-awesome-project');
      process.exit(1);
    }

    // 验证项目名称格式
    const projectName = args.name.trim();
    if (!/^[a-zA-Z0-9-_]+$/.test(projectName)) {
      consola.error('🚫 项目名称只能包含字母、数字、连字符和下划线');
      consola.info('💡 有效示例: my-project, my_project, myproject123');
      process.exit(1);
    }

    const conf = await create();
    const path = await download(projectName, conf);
    if (path && conf?.template) {
      const strategy = new Strategy(projectName, path);
      // @ts-ignore
      strategy?.[conf?.template]?.(conf);
    }
  },
});
