/*
 * @Author: cola
 * @Date: 2023-09-08 00:33:25
 * @LastEditors: cola
 * @Description:
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "clover", "json"],
    },
  },
});
