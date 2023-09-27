/*
 * @Author: cola
 * @Date: 2023-09-08 16:59:32
 * @LastEditors: cola
 * @Description:
 */
const baseURL = "https://github.aitimi.cn";
import fetch from "node-fetch-native";
export async function createRepo(data: Record<string, unknown>, auth: string) {
  return fetch(`${baseURL}/user/repos`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      authorization: `Bearer ${auth}`,
    },
  });
}
