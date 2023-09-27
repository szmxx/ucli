/*
 * @Author: cola
 * @Date: 2022-07-23 03:36:19
 * @LastEditors: cola
 * @Description:
 */

import { originGet, AxiosConfig } from './index'
export interface AppConfig {
  title: string
  development?: AxiosConfig
  production?: AxiosConfig
  [key: string]: unknown | AxiosConfig
}

export function getAppConfig() {
  return originGet<AppConfig>('/static/appConfig.json')
}
