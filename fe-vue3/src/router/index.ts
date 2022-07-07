import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  // {
  //   name: 'home',
  //   path: '/home',
  //   component: () => import('../views/home/home.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
