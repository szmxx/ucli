/*
 * @Author: cola
 * @Date: 2023-09-09 11:41:50
 * @LastEditors: cola
 * @Description:
 */
export default {
  mounted(el: HTMLElement, binding: Record<string, unknown>) {
    if (binding.value) {
      if (el.nodeName === 'INPUT') {
        el?.focus?.()
      } else {
        el?.querySelector?.('input')?.focus?.()
      }
    }
  },
}
