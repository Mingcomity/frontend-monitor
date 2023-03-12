import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
// 谷歌控制台报错
import 'default-passive-events'
import { createPinia } from 'pinia'
import '@/assets/rebase.css'
// pinia 持久化插件
/**
 * key:本地存储的名字
 * type:本地存储方式 'sessionStorage'/ 'localStorage'
 * storeKey:仓库中的哪些数据需要进行存储，格式：${仓库名}-${键名}
 */
import { piniaPlugin } from '@/utils/piniaPlugins'

const app = createApp(App)

const store = createPinia()
store.use(
  piniaPlugin({
    key: 'pinia',
    type: 'sessionStorage',
    storeKey: [
      'User-username',
      'Project-projectArr',
      'Project-theCurrentProject',
      'User-id'
    ]
  })
)

app.use(router)
app.use(store)
app.mount('#app')
