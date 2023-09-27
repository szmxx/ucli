/*
 * @Author: cola
 * @Date: 2022-07-19 14:14:09
 * @LastEditors: cola
 * @Description:
 */

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
darkModeMediaQuery.addListener((e) => {
  useTheme(e.matches ? 'dark' : 'light')
})
export const currentTheme = ref(localStorage.getItem('theme') || 'light')
export async function useTheme(theme: string) {
  if (!theme) {
    theme = currentTheme.value
  } else {
    currentTheme.value = theme
  }
  if (theme) document.documentElement.className = theme
  localStorage.setItem('theme', theme)
}
