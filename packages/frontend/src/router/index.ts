import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
import {
  useUserStore,
  useProjectStore,
  usePerformance,
  useBehavior
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
    redirect: '/home/setting',
    children: [
      {
        path: 'overview',
        component: () => import('@/views/overview/index.vue'),
        meta: {
          index: 0
        }
      },
      {
        path: 'exception',
        component: () => import('@/views/exception/index.vue'),
        meta: {
          index: 1
        }
      },
      {
        path: 'behavior',
        component: () => import('@/views/behavior/index.vue'),
        meta: {
          index: 2
        }
      },
      {
        path: 'performance',
        component: () => import('@/views/performance/index.vue'),
        meta: {
          index: 3
        }
      },
      {
        path: 'setting',
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from) => {
  try {
    const token = Cookies.get('token')
    if (to.name === 'login' && token) {
      return '/home'
    }
    if (to.name === 'login') {
      return true
    }
    if (!token) {
      return 'login'
    }
    if (_from.name === 'login' && token) {
      //放在引入后会导致pinia实例还未挂载就调用，所以需要在此处调用
      const userInfo = useUserStore()
      const projectInfo = useProjectStore()
      await userInfo.getUserInfoAPi()
      await projectInfo.getProjectInfo()
      return true
    }
    if (token) {
      const behavior = useBehavior()
      const performance = usePerformance()
      await performance.getPerformance()
      await behavior.getBehvior()
      return true
    }
  } catch (error) {
    console.error(error)
  }
})
export default router
