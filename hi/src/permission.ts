/*
 * @Author: cola
 * @Date: 2022-10-31 11:08:30
 * @LastEditors: cola
 * @Description:
 */
import router from './route'
import NProgress from 'nprogress'
import { isEmpty, assign } from 'lodash'
NProgress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (isEmpty(history.state.current)) {
    assign(history.state, { current: from.fullPath })
  }
  console.log(to, from)
  next()
})

router.afterEach(() => {
  NProgress.done()
})
