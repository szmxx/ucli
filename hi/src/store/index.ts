/*
 * @Author: cola
 * @Date: 2023-07-15 17:02:49
 * @LastEditors: cola
 * @Description:
 */
import { App } from 'vue'
import { createPinia } from 'pinia'

export function install(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
