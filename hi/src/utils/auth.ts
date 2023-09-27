/*
 * @Author: cola
 * @Date: 2022-07-24 14:01:09
 * @LastEditors: cola
 * @Description:
 */
import Cookies from 'universal-cookie'
const cookies = new Cookies(null, { path: '/' })
const TOKEN_KEY = 'token'
const REFRESH_KEY = 'refresh_token'

export function getToken(): string {
  return cookies.get(TOKEN_KEY)
}

export function setToken(value: string) {
  return cookies.set(TOKEN_KEY, value)
}

export function removeToken() {
  return cookies.remove(TOKEN_KEY)
}

export function getRefreshToken(): string {
  return cookies.get(REFRESH_KEY)
}

export function setRefreshToken(value: string) {
  return cookies.set(REFRESH_KEY, value)
}

export function removeRefreshToken() {
  return cookies.remove(REFRESH_KEY)
}
