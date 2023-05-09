import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
import {
  useUserStore,
  useProjectStore,
  usePerformance,
  useBehavior,
  useExceptionStore
} from '@/stores'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
    redirect: '/home/overview',
    children: [
      {
        path: 'overview',
        name: 'home/overview',
        component: () => import('@/views/overview/index.vue'),
        meta: {
          index: 0
        }
      },
      {
        path: 'exception',
        name: 'home/exception',
        component: () => import('@/views/exception/index.vue'),
        meta: {
          index: 1
        }
      },
      {
        path: 'behavior',
        name: 'home/behavior',
        component: () => import('@/views/behavior/index.vue'),
        meta: {
          index: 2
        }
      },
      {
        path: 'performance',
        name: 'home/performance',
        component: () => import('@/views/performance/index.vue'),
        meta: {
          index: 3
        }
      },
      {
        path: 'setting',
        name: 'home/setting',
        component: () => import('@/views/setting/index.vue'),
        meta: {
          index: 4
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  }
]
const pathArr = [
  '/home',
  '/home/setting',
  '/home/performance',
  '/home/behavior',
  '/home/exception',
  '/home/overview',
  '/login'
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from) => {
  if (!pathArr.some((val) => val === to.fullPath)) return 'home'
  try {
    const token = Cookies.get('token')
    const behavior = useBehavior()
    const performance = usePerformance()
    const exception = useExceptionStore()
    const project = useProjectStore()
    const user = useUserStore()
    if (token) {
      if (_from.name === 'login') {
        project.getProjectInfo()
      }
      switch (to.name) {
        case 'login':
          return '/home'
        case 'home/overview':
          //放在引入后会导致pinia实例还未挂载就调用，所以需要在此处调用
          performance.getPerformance()
          behavior.getBehvior()
          exception.getException()
          return true
        case 'home/exception':
          exception.getException()
          return true
        case 'home/behavior':
          behavior.getBehvior()
          return true
        case 'home/performance':
          performance.getPerformance()
          return true
        case 'home/setting':
          user.getUserInfoAPi()
          return
        default:
          break
      }
    } else {
      if (to.name === 'login') {
        return true
      }
      return 'login'
    }
  } catch (error) {
    //@ts-ignore
    ElMessage.error('请求发生错误！')
  }
})
export default router
