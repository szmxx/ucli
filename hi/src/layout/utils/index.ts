/*
 * @Author: cola
 * @Date: 2023-01-09 10:20:58
 * @LastEditors: cola
 * @Description:
 */
import { RouteRecordRaw } from 'vue-router'

export function isSelfRouteFn() {
  const router = useRouter()
  let pathname = location.pathname.startsWith('/')
    ? location.pathname.split('/')[1]
    : location.pathname.split('/')[0]
  pathname = '/' + pathname
  const routes: RouteRecordRaw[] = router.getRoutes()

  for (let i = 0; i < routes.length; i++) {
    // 路由表路径和本地一致，则是本地路由
    if (routes[i].path === pathname) {
      return true
    }
  }
  return false
}
