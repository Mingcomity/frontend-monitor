import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
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

router.beforeEach(async (to, _from) => {
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
        await project.getProjectInfo()
      }
      switch (to.name) {
        case 'login':
          return '/home'
        case 'home/overview':
          //放在引入后会导致pinia实例还未挂载就调用，所以需要在此处调用
          await performance.getPerformance()
          await behavior.getBehvior()
          await exception.getException()
          return true
        case 'home/exception':
          await exception.getException()
          return true
        case 'home/behavior':
          await behavior.getBehvior()
          return true
        case 'home/performance':
          await performance.getPerformance()
          return true
        case 'home/setting':
          await user.getUserInfoAPi()
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
    console.error(error)
  }
})
export default router
