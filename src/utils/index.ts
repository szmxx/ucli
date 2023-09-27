import { consola } from "consola";

export function debug(...arguments_: unknown[]) {
  if (process.env.NODE_ENV === "debug") {
    consola.debug("[ucli]", ...arguments_);
  }
}
