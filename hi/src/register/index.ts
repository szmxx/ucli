/*
 * @Author: cola
 * @Date: 2022-07-05 10:22:47
 * @LastEditors: cola
 * @Description:
 */
import { App } from 'vue'
import './registerStyle'
import { install as installRouter } from '@/route'
import { install as installStore } from '@/store'
import installProperty from './registerProperty'
import installDirective from './directives/index'
export default (app: App) => {
  installRouter(app)
  installStore(app)
  installDirective(app)
  installProperty(app)
}
