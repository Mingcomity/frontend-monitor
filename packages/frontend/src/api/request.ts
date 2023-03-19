import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:1205',
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
    return Promise.reject(err)
  }
)

export default instance
