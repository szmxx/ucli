/*
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import install from '@/register'
import initConfig from './config'
import './permission'
const app = createApp(App)
install(app)
;(async () => {
  try {
    await initConfig()
    app.mount('#app')
  } catch {
    ElNotification({
      title: '系统错误',
      message: '加载配置文件失败！',
      type: 'error',
    })
  }
})()
