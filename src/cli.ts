import { consola } from "consola";
import figlet from "figlet";
import { defineCommand, runMain } from "citty";
import { config } from "dotenv";
import { name, version, description } from "../package.json";

// 加载 .env 文件（静默模式）
// 临时禁用 console.log 来阻止 dotenv 输出
const originalLog = console.log;
console.log = () => {};
config();
console.log = originalLog;

function start() {
  try {
    const main = defineCommand({
      meta: {
        name: name?.replace?.("@szmxx/", ""),
        version: version,
        description: `🚀 ${description}\n\n💡 快速开始:\n  ucli create my-project    创建新项目\n  ucli create --help        查看创建命令帮助\n\n📖 更多信息: https://github.com/szmxx/ucli`,
      },
      subCommands: {
        create: () => import("./commands/create").then((r) => r.default),
      },

      run({ args }) {
        // 只有在没有任何参数时才显示 ASCII 艺术字
        if (
          args._.length === 0 &&
          Object.keys(args).filter((key) => key !== "_").length === 0
        ) {
          const asciiArt = figlet.textSync(name?.replace?.("@szmxx/", ""), {
            font: "Star Wars",
          });
          // 使用彩色打印
          consola.info(asciiArt);
          consola.info("🚀 统一脚手架工具");
          consola.info("💡 使用 ucli create <项目名称> 创建新项目");
          consola.info("📖 使用 ucli --help 查看更多帮助");
        }
      },
    });
    runMain(main);
  } catch (error) {
    consola.error(error);
  }
}
start();
