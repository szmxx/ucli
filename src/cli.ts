/*
 * @Author: cola
 * @Date: 2023-09-08 01:33:14
 * @LastEditors: cola
 * @Description:
 */
import { consola } from "consola";
import figlet from "figlet";
import { defineCommand, runMain } from "citty";
import { name, version, description } from "../package.json";
import "dotenv/config";

function start() {
  try {
    const main = defineCommand({
      meta: {
        name: name?.replace?.("@szmxx/", ""),
        version: version,
        description: description,
      },
      subCommands: {
        create: () => import("./commands/create").then((r) => r.default),
      },
      run({ args }) {
        if (!args.create && args._[0] !== "create") {
          consola.log(
            figlet.textSync(name?.replace?.("@szmxx/", ""), {
              font: "Star Wars",
            })
          );
        }
      },
    });
    runMain(main);
  } catch (error) {
    consola.error(error);
  }
}
start();
