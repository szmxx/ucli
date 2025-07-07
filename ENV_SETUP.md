# 环境变量配置指南

本项目支持通过 `.env` 文件进行环境变量配置。

## 快速开始

1. 复制示例配置文件：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，根据需要修改配置项。

## 可用的环境变量

### 基础配置

- `NODE_ENV`: 运行环境 (development/production)
- `DEBUG`: 调试模式 (true/false)

### API 配置

- `API_BASE_URL`: API 基础 URL (默认: https://api.github.com)
- `GITHUB_TOKEN`: GitHub API Token (可选，用于创建仓库等操作)

## 使用示例

### 在代码中使用环境变量

```typescript
import { env } from './src/env';

// 获取配置
console.log('当前环境:', env.NODE_ENV);
console.log('调试模式:', env.DEBUG);
console.log('API URL:', env.API_BASE_URL);
```

### 调试模式

设置 `DEBUG=true` 或 `NODE_ENV=debug` 来启用调试输出：

```bash
# 方式1: 通过 .env 文件
DEBUG=true

# 方式2: 通过环境变量
NODE_ENV=debug

# 方式3: 临时设置
DEBUG=true ucli create
```

### GitHub API 集成

如果需要使用 GitHub API 功能，请设置 `GITHUB_TOKEN`：

1. 在 GitHub 创建 Personal Access Token
2. 在 `.env` 文件中设置：
```
GITHUB_TOKEN=your_token_here
```

## 注意事项

- `.env` 文件已添加到 `.gitignore`，不会被提交到版本控制
- 生产环境建议通过系统环境变量设置，而不是 `.env` 文件
- 敏感信息（如 API Token）请妥善保管，不要泄露

## 环境变量优先级

1. 系统环境变量（最高优先级）
2. `.env` 文件
3. 代码中的默认值（最低优先级）
