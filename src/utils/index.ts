import { consola } from "consola";

export function debug(...arguments_: unknown[]) {
  if (process.env.DEBUG === 'true' || process.env.NODE_ENV === 'development') {
    consola.debug("[ucli]", ...arguments_);
  }
}
