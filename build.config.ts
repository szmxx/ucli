/*
 * @Author: cola
 * @Date: 2023-09-08 00:40:20
 * @LastEditors: cola
 * @Description:
 */
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index", "src/cli"],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
});
