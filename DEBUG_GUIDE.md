# 本地调试指南

本指南将帮助你使用 VS Code 的 debugger 断点功能来调试 ucli 项目。

## 前置条件

1. 安装 VS Code
2. 确保项目依赖已安装：`pnpm install`
3. 安装 jiti（如果还没有）：`pnpm add -D jiti`

## 调试配置

项目已配置了多个调试选项，可以通过 VS Code 的调试面板使用：

### 1. Debug ucli CLI (built)
- **用途**：调试主 CLI 入口，不带任何参数
- **启动方式**：按 F5 或在调试面板选择 "Debug ucli CLI (built)"
- **调试方式**：自动构建后调试编译后的 JavaScript 文件
- **优势**：稳定可靠，与生产环境一致

### 2. Debug ucli create (built)
- **用途**：调试 create 命令，预设参数为 `create test-project`
- **启动方式**：在调试面板选择 "Debug ucli create (built)"
- **调试方式**：自动构建后调试编译后的 JavaScript 文件

### 3. Debug built CLI
- **用途**：调试构建后的 JavaScript 文件
- **启动方式**：在调试面板选择 "Debug built CLI"
- **注意**：需要先运行 `pnpm run build`

### 4. Attach to Node Process
- **用途**：附加到正在运行的 Node.js 进程
- **启动方式**：先启动带 `--inspect` 的进程，然后选择此配置

## 使用步骤

### 方法一：VS Code 调试面板

1. 在 VS Code 中打开项目
2. 在源码中设置断点（点击行号左侧或按 F9）
3. 按 `Ctrl+Shift+D`（Windows/Linux）或 `Cmd+Shift+D`（Mac）打开调试面板
4. 选择调试配置（如 "Debug ucli CLI"）
5. 点击绿色播放按钮或按 F5 开始调试

### 方法二：快捷键调试

1. 在源码中设置断点
2. 直接按 F5 启动默认调试配置
3. 程序会在断点处暂停，你可以：
   - 查看变量值
   - 单步执行（F10）
   - 进入函数（F11）
   - 跳出函数（Shift+F11）
   - 继续执行（F5）

## 常用调试场景

### 调试 CLI 启动过程

在 `src/cli.ts` 中设置断点：

```typescript
// 在这里设置断点
function start() {
  debugger; // 或者添加 debugger 语句
  try {
    const main = defineCommand({
      // ...
    });
  }
}
```

### 调试环境变量加载

在 `src/env.ts` 中设置断点：

```typescript
export function getEnvConfig(): EnvConfig {
  debugger; // 在这里设置断点
  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    // ...
  };
}
```

### 调试命令执行

在 `src/commands/create.ts` 中设置断点：

```typescript
// 在命令处理函数中设置断点
export default defineCommand({
  run(ctx) {
    debugger; // 在这里设置断点
    // 命令逻辑
  }
});
```

## 调试技巧

### 1. 使用 debugger 语句

在代码中直接添加 `debugger;` 语句：

```typescript
function someFunction() {
  const config = getEnvConfig();
  debugger; // 程序会在这里暂停
  console.log(config);
}
```

### 2. 条件断点

右键点击断点，设置条件：

```javascript
// 只有当 env.DEBUG 为 true 时才暂停
env.DEBUG === true
```

### 3. 日志断点

右键点击断点，选择 "Edit Breakpoint" > "Logpoint"：

```javascript
// 输出变量值而不暂停程序
"Config loaded: {config}"
```

### 4. 调试控制台

在调试时，可以在 "DEBUG CONSOLE" 中执行表达式：

```javascript
// 查看变量
env
process.env.NODE_ENV

// 执行函数
getEnvConfig()
```

## 环境变量调试

调试配置已经设置了环境变量：

- `NODE_ENV=debug`：启用调试模式
- 自动加载 `.env` 文件

你可以在 `.env` 文件中设置：

```env
DEBUG=true
NODE_ENV=debug
```

## 常见问题

### 1. 断点不生效

- 确保使用的是 TypeScript 源码调试配置
- 检查 source map 是否正确生成
- 尝试重启调试会话

### 2. 无法附加到进程

```bash
# 启动带调试端口的进程
node --inspect=9229 bin/index.mjs

# 然后使用 "Attach to Node Process" 配置
```

### 3. 环境变量未加载

- 检查 `.env` 文件是否存在
- 确保调试配置中的 `envFile` 路径正确

## 高级调试

### 调试测试

```bash
# 调试特定测试
node --inspect-brk node_modules/.bin/vitest run --no-coverage
```

### 性能调试

```bash
# 生成性能报告
node --prof bin/index.mjs create test-project
node --prof-process isolate-*.log > profile.txt
```

## 快速开始

1. 复制环境配置：`cp .env.example .env`
2. 在 `src/cli.ts` 的 `start()` 函数开头设置断点
3. 按 F5 开始调试
4. 程序会在断点处暂停，你可以开始调试了！

### 开发模式运行

```bash
# 使用 pnpm 脚本运行（推荐）
pnpm run dev
pnpm run dev --help
pnpm run dev create test-project

# 或者直接使用 jiti
npx jiti src/cli.ts
npx jiti src/cli.ts create
```

### 开发工具推荐

- **VS Code 调试**：使用调试面板中的配置进行断点调试
- **开发模式**：使用 `pnpm run dev` 快速运行和测试
- **构建调试**：使用构建后的文件进行稳定调试
- **日志调试**：使用 `console.log` 或 `consola.debug` 输出调试信息
- **检查器调试**：使用 `pnpm run debug:inspect` 进行高级调试

现在你可以愉快地使用断点调试 ucli 项目了！🎉
