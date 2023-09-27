/*
 * @Author: cola
 * @Date: 2022-07-17 20:54:55
 * @LastEditors: cola
 * @Description:
 */
import { InjectionKey } from 'vue'
export function getUrlParams(url = location.href) {
  const search = url.split('?')[1]
  return [...new URLSearchParams(search)].reduce(
    (a: Record<string, string>, [k, v]) => ((a[k] = v), a),
    {},
  )
}
export function toRawType(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}
export function cached(fn: (str: string) => unknown): (str: string) => unknown {
  const cache = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }
  return resolved
}
