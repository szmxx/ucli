/*
 * @Author: cola
 * @Date: 2022-07-05 10:18:26
 * @LastEditors: cola
 * @Description:
 */
import LayoutPage from '@/layout'
import { RouteRecordRaw } from 'vue-router'

const files = import.meta.glob('./*.ts', { eager: true })

interface IModule {
  default: RouteRecordRaw
}
const modules: RouteRecordRaw[] = []
for (const [, module] of Object.entries(files)) {
  ;(module as IModule).default.component = LayoutPage
  modules.push((module as IModule).default)
}
export default modules
