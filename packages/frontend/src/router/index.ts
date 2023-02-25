import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
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
        component: () => import('@/views/overview/index.vue')
      },
      {
        path: 'exception',
        component: () => import('@/views/exception/index.vue')
      },
      {
        path: 'behavior',
        component: () => import('@/views/behavior/index.vue')
      },
      {
        path: 'performance',
        component: () => import('@/views/performance/index.vue')
      },
      {
        path: 'setting',
        component: () => import('@/views/setting/index.vue')
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

router.beforeEach((to, _from) => {
  const token = Cookies.get('token')
  if (to.name === 'login') {
    return true
  }
  if (!token) {
    return 'login'
  }
})
export default router
