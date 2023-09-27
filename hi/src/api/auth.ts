import { GET, POST } from './index'

interface ILoginParams {
  username: string
  password: string
}
interface IAuthParams {
  code: string | unknown
}
interface IRefreshParams {
  token?: string
  refreshToken: string
}

interface Auth {
  token: string
  refreshToken: string
}

interface ILogin {
  code: string
}

export function login(data: ILoginParams) {
  return POST<ILogin>(`/auth/login`, '登录', data)
}
export function sso() {
  return POST<Record<string, string>>(`/auth/sso`, '单点登录', {})
}
export function getUserInfo(params: ILoginParams) {
  return GET<Auth>('/auth/userInfo', '获取用户信息', params)
}

export function refreshToken(data: IRefreshParams) {
  return POST<string>('/auth/refreshToken', '刷新 TOKEN', data)
}

export function auth(data: IAuthParams) {
  return POST<Auth>('/auth/authenticate', '请求 REFRESH TOKEN', data)
}
