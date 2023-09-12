/*
 * @Author: cola
 * @Date: 2023-09-08 01:41:09
 * @LastEditors: cola
 * @Description:
 */
import { defineCommand } from "citty";
import { create } from "../inquirer/create";
import { download } from "../utils/download";
import Strategy from "../strategy/core";
export default defineCommand({
  meta: {
    name: "create",
    description: "create a new project",
  },
  args: {
    name: {
      type: "positional",
      description: "<project-name>",
      required: true,
    },
  },
  async run({ args }) {
    const conf = await create();
    const path = await download(args?.name, conf);
    if (path && conf?.template) {
      const strategy = new Strategy(args.name, path);
      // @ts-ignore
      strategy?.[conf?.template]?.(conf);
    }
  },
});
