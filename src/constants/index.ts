/**
 * 项目配置常量
 */

// 功能特性配置
export const FEATURE_CONFIG = {
  theme: {
    name: "主题",
    description: "支持深色/浅色主题切换",
    icon: "🎨",
    default: true,
  },
  i18n: {
    name: "多语言",
    description: "国际化支持 (i18n)",
    icon: "🌍",
    default: false,
  },
} as const;

// 支持的功能特性（从 FEATURE_CONFIG 动态生成）
export const SUPPORTED_FEATURES = Object.keys(
  FEATURE_CONFIG
) as (keyof typeof FEATURE_CONFIG)[];

// 组件库详细配置
export const COMPONENT_CONFIG = {
  empty: {
    displayName: "无组件库，纯净模板",
    icon: "📦",
    description: undefined as string | undefined,
    templates: ["Vue3", "Nuxt3"] as const,
    default: true,
  },
  "element-plus": {
    displayName: "element-plus",
    icon: "🎨",
    description: "Vue 3 桌面端组件库" as string | undefined,
    templates: ["Vue3", "Nuxt3"] as const,
    default: false,
  },
  vant: {
    displayName: "vant",
    icon: "📱",
    description: "Vue 3 移动端组件库" as string | undefined,
    templates: ["Vue3", "Nuxt3"] as const,
    default: false,
  },
  qiankun: {
    displayName: "qiankun",
    icon: "🏗️",
    description: "微前端解决方案" as string | undefined,
    templates: ["Vue3"] as const,
    default: false,
  },
} as const;

// 模板支持的组件库映射
export const TEMPLATE_COMPONENT_MAP = {
  Vue3: ["empty", "element-plus", "vant", "qiankun"] as const,
  Nuxt3: ["empty", "element-plus", "vant"] as const,
  Node: [] as const,
} as const;

// 模板详细配置
export const TEMPLATE_CONFIG = {
  Vue3: {
    name: "Vue3",
    description: "现代化 Vue3 项目",
    icon: "🟢",
  },
  Nuxt3: {
    name: "Nuxt3",
    description: "全栈 Nuxt3 框架",
    icon: "🚀",
  },
  Node: {
    name: "Node",
    description: "Node.js 后端项目",
    icon: "🟨",
  },
} as const;

// 支持的模板类型（从 TEMPLATE_CONFIG 动态生成）
export const SUPPORTED_TEMPLATES = Object.keys(
  TEMPLATE_CONFIG
) as (keyof typeof TEMPLATE_CONFIG)[];

// 默认分支名称
export const DEFAULT_BRANCH = "main";

// 下载相关配置
export const DOWNLOAD_CONFIG = {
  spinner: {
    text: "🚀 正在下载模板...",
    type: "dots12" as const,
    color: "cyan" as const,
  },
  pageSize: {
    component: 6,
    feature: 5,
  },
} as const;

// 消息文本
export const MESSAGES = {
  prompts: {
    template: "🎯 请选择项目模板:",
    component: "🧩 请选择组件库:",
    feature: "✨ 请选择功能特性:",
    override: "⚠️ 目录已存在，是否覆盖?",
  },
  success: {
    download: "✅ 模板下载完成!",
    repoCreated: "✅ 创建远程仓库成功",
    gitInit: "✅ Git 初始化完成（已关联远程仓库）",
    gitInitLocal: "✅ Git 初始化完成（仅本地仓库）",
    depsInstalled: "✅ 依赖安装完成",
    codePushed: "✅ 代码已提交并推送到远程仓库",
  },
  error: {
    download: "❌ 下载失败:",
    projectName: "🚫 请提供项目名称",
    invalidName: "🚫 项目名称只能包含字母、数字、连字符和下划线",
    repoCreateFailed: "❌ 创建远程仓库失败",
    authFailed: "❌ 授权失败",
    repoExists: "❌ 仓库名称已存在",
    gitInitFailed: "❌ Git 初始化失败",
    depsInstallFailed: "❌ 依赖安装失败",
    pushFailed: "❌ 提交推送失败",
  },
  warning: {
    repoCreateSkipped: "⚠️ 远程仓库创建失败，将继续进行本地初始化",
    noToken: "⚠️ 未配置远程仓库，跳过推送步骤",
  },
  tips: {
    usage: "💡 使用方法: ucli create <项目名称>",
    example: "📝 示例: ucli create my-awesome-project",
    validName: "💡 有效示例: my-project, my_project, myproject123",
    retry: "💡 建议:",
    network: "  • 检查网络连接",
    retryLater: "  • 稍后重试",
    checkTemplate: "  • 确认模板名称是否正确",
    useProxy: "  • 尝试使用代理或切换网络环境",
    tokenConfig: "💡 提示: 未配置 GitHub Token，跳过远程仓库创建",
    tokenConfigMethods: "   可通过以下方式配置:",
    tokenConfigGit: '   • git config --global ucli.github "your_token"',
    tokenConfigEnv: '   • export GITHUB_TOKEN="your_token"',
    checkToken: "   • 检查 GitHub Token 是否有效",
    checkPermission: "   • 确认 Token 具有 repo 权限",
    regenerateToken: "   • 重新生成并配置新的 Token",
    tryDifferentName: "💡 建议: 尝试使用不同的项目名称",
    manualInstall: "   • 尝试使用 npm install 或 yarn install",
    checkRepoAccess: "   • 确认远程仓库访问权限",
    manualPush: "   • 稍后可手动执行: git push origin main",
  },
} as const;

// 项目名称验证正则
export const PROJECT_NAME_REGEX = /^[a-zA-Z0-9_-]+$/;

// Git 配置键名
export const GIT_CONFIG_KEY = "ucli.github";

// 开源协议配置
export const LICENSE_CONFIG = {
  MIT: {
    name: "MIT",
    displayName: "MIT - 最宽松的开源协议",
    icon: "📄",
    color: "green",
  },
  "Apache-2.0": {
    name: "Apache-2.0",
    displayName: "Apache 2.0 - 商业友好的开源协议",
    icon: "📋",
    color: "blue",
  },
  "GPL-3.0": {
    name: "GPL-3.0",
    displayName: "GPL 3.0 - 强制开源的协议",
    icon: "📜",
    color: "yellow",
  },
  "LGPL-3.0": {
    name: "LGPL-3.0",
    displayName: "LGPL 3.0 - 库友好的 GPL 协议",
    icon: "📃",
    color: "cyan",
  },
  "MPL-2.0": {
    name: "MPL-2.0",
    displayName: "MPL 2.0 - Mozilla 公共许可证",
    icon: "📄",
    color: "red",
  },
  custom: {
    name: "custom",
    displayName: "自定义 - 输入自定义协议",
    icon: "📝",
    color: "green",
  },
} as const;

// 支持的开源协议（从 LICENSE_CONFIG 动态生成）
export const SUPPORTED_LICENSES = Object.keys(
  LICENSE_CONFIG
) as (keyof typeof LICENSE_CONFIG)[];

// 类型定义
export type SupportedFeature = (typeof SUPPORTED_FEATURES)[number];
export type SupportedTemplate = (typeof SUPPORTED_TEMPLATES)[number];
export type SupportedComponent = keyof typeof COMPONENT_CONFIG;
export type SupportedLicense = (typeof SUPPORTED_LICENSES)[number];
