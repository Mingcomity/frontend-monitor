import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: 'http://114.132.223.185:1110',
  timeout: 15000
})

// 拦截器 —— 请求前
instance.interceptors.request.use(
  (config) => {
    // 判断 post 请求，设置请求体
    if (config.method === 'post' || config.method === 'put') {
      config.headers.set('content-type', 'application/x-www-form-urlencoded')
    }
    const token = Cookies.get('token')
    // 判断token是否存在，对token进行携带
    if (token && config.headers) {
      typeof config.headers.set === 'function' &&
        config.headers.set('Authorization', token)
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 拦截器 —— 请求后
instance.interceptors.response.use(
  (result) => {
    return result
  },
  (err) => {
    if (err.code === 'ECONNABORTED') {
      //@ts-ignore
      ElMessage.error('请求超时!')
    } else if (err.response) {
      if (err.response.statusText === '') {
        //@ts-ignore
        ElMessage.error(err.message)
      }
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      switch (err.response.status) {
        case 400:
          //@ts-ignore
          ElMessage.error('报文有误！')
          break
        case 401:
          //@ts-ignore
          ElMessage.error('未授权！')
          break
        case 403:
          //@ts-ignore
          ElMessage.error('没有权限访问！')
          break
        case 404:
          //@ts-ignore
          ElMessage.error('找不到请求资源！')
          break
        default:
          //@ts-ignore
          ElMessage.error(err.request.statusText)
          break
      }
    } else if (err.request) {
      // 请求已经成功发起，但没有收到响应
      if (err.response.statusText === '') {
        //@ts-ignore
        ElMessage.error(err.message)
      }
      switch (err.request.status) {
        case 400:
          //@ts-ignore
          ElMessage.error('报文有误！')
          break
        case 401:
          //@ts-ignore
          ElMessage.error('未授权！')
          break
        case 403:
          //@ts-ignore
          ElMessage.error('没有权限访问！')
          break
        case 404:
          //@ts-ignore
          ElMessage.error('找不到请求资源！')
          break
        default:
          //@ts-ignore
          ElMessage.error(err.request.statusText)
          break
      }
    } else {
      //@ts-ignore
      ElMessage.error(err.message)
    }
  }
)

export default instance
