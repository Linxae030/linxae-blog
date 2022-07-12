import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/home/home.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局守卫：登录拦截 本地没有存token,请重新登录
// router.beforeEach((to, from, next) => {
//   // 判断有没有登录
//   if (!localStorage.getItem('token')) {
//     if (to.name == "login") {
//       next();
//     } else {
//       router.push('login')
//     }
//   } else {
//     next();
//   }
// });


export default router
