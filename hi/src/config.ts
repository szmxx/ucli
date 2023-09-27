/*
 * @Author: cola
 * @Date: 2022-07-05 17:41:15
 * @LastEditors: cola
 * @Description:
 */
import {
  initAxiosInstance,
  initBusinessInstance,
  AxiosConfig,
} from './api/index'
import { getAppConfig, AppConfig } from './api/public'
import useStore from '@/store/app'
import { initMicroApp } from './qiankun'
const envList = ['development', 'production']
function getRestConfig(config: AppConfig): AppConfig {
  const res = Object.keys(config).reduce(
    (acc: Record<string, unknown>, cur: string) => {
      if (!envList.includes(cur)) {
        acc[cur] = config[cur]
      }
      return acc
    },
    {},
  )
  Object.assign(res, config[import.meta.env.MODE])
  return res as AppConfig
}
export default async () => {
  const store = useStore()
  const config = await getAppConfig()
  const envConfig = config[import.meta.env.MODE] as AxiosConfig
  initMicroApp(envConfig.APP_LIST)
  initAxiosInstance(envConfig)
  initBusinessInstance(envConfig)
  const restConfig = getRestConfig(config)
  store.setConfig(restConfig)
}
