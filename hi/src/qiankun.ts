/*
 * @Author: cola
 * @Date: 2023-01-06 15:45:58
 * @LastEditors: cola
 * @Description:
 */
import {
  registerMicroApps,
  start,
  initGlobalState,
  RegistrableApp,
  addGlobalUncaughtErrorHandler,
} from 'qiankun'

const globalState = {
  userInfo: {},
}
const { onGlobalStateChange, setGlobalState } = initGlobalState(globalState)

// 错误事件处理
addGlobalUncaughtErrorHandler((event) => console.log(event))

// 状态变更
onGlobalStateChange((newVal, oldVal) => {
  console.log(newVal, oldVal)
})

export function initMicroApp(
  apps: Array<RegistrableApp<Record<string, unknown>>>,
) {
  const appList: Array<RegistrableApp<Record<string, unknown>>> = []
  apps.forEach((item) => {
    appList.push({
      ...item,
      props: {
        ...item,
      },
    })
  })
  registerMicroApps(appList)
  // 启动 qiankun
  start({
    sandbox: {
      strictStyleIsolation: true,
      experimentalStyleIsolation: false,
    },
    prefetch: 'all',
  })
}
// 重新设置 globalState
export function setGlobalData(state = {}) {
  setGlobalState({
    state,
  })
}
