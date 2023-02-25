import axios from 'axios'
import { type AxiosHeaders } from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:1205',
  timeout: 15000
})

// 拦截器
instance.interceptors.request.use(
  (config) => {
    // 判断 post 请求，设置请求头部
    if (config.method === 'post') {
      config.headers.set('content-type', 'application/x-www-form-urlencoded')
    }
    const token = Cookies.get('token')
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
instance.interceptors.response.use(
  (result) => {
    return result
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
