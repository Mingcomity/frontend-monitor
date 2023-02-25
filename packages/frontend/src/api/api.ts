import request from './request'

// 登录后返回token
export const adminLoginApi = (data: AdminLogin) =>
  request.post('/user/login', data)

// 注册
export const adminRegisterApi = (data: AdminLogin) =>
  request.post('/user/register', data)
