/*
 * @Author: cola
 * @Date: 2022-07-04 19:10:01
 * @LastEditors: cola
 * @Description:
 */
import {
  createRouter,
  RouteRecordRaw,
  createWebHistory,
  RouteLocationNormalized,
} from 'vue-router'
import HomePage from '@/views/home'
import ErrorPage from '@/views/error'
import routes from './routes'
import { App } from 'vue'
import useAppStore from '@/store/app'

export const ConstantRoutes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: HomePage,
  },
  {
    path: '/404',
    name: 'NotExist',
    component: ErrorPage,
  },
]
export const AsyncRoutes = [...routes]

const router = createRouter({
  history: createWebHistory(),
  routes: ConstantRoutes,
})

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function addRoutes(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    router.addRoute(route)
  })
}

export function isNotFoundRoute(route: RouteLocationNormalized) {
  let pathname = route.path.startsWith('/')
    ? location.pathname.split('/')[1]
    : location.pathname.split('/')[0]
  pathname = '/' + pathname
  const store = useAppStore()

  const appRoutes = store.appList.reduce(
    (acc: Record<string, unknown>[], cur) => {
      let rules = cur.activeRule as string[]
      if (!Array.isArray(rules)) {
        rules = [rules]
      }
      rules.forEach((rule) => {
        acc.push({
          path: rule,
        })
      })
      return acc
    },
    [],
  )
  const routes = [...router.getRoutes(), ...appRoutes]
  for (let i = 0; i < routes.length; i++) {
    // 路由表路径和本地一致，则是本地路由
    if (routes[i].path === pathname) {
      return false
    }
  }
  return true
}

export function install(app?: App) {
  if (app) {
    app.use(router)
  }
}

export default router
