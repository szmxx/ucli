/*
 * @Author: cola
 * @Date: 2022-07-12 10:26:52
 * @LastEditors: cola
 * @Description:
 */
import { AppConfig } from '@/api/public'
import { defineStore } from 'pinia'
export default defineStore('app', {
  state: () => {
    return {
      _config: {} as AppConfig,
    }
  },
  getters: {
    config: (state) => state._config,
    appList: (state) =>
      (state?._config?.APP_LIST || []) as Record<string, unknown>[],
  },
  actions: {
    setConfig(config: AppConfig) {
      this._config = config
    },
  },
})
