import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { logout } from '@/api/login/login&registerApi'
const routes: Array<RouteRecordRaw> = [
	{
		name: 'home',
		path: '/',
		component: () => import('../views/home/home.vue'),
		children: [{
			name: 'articlesPost',
			path: 'articlesPost',
			component: () => import('../views/articles/articlesPost.vue'),
		}]
	}, {
		name: 'login',
		path: '/login',
		component: () => import('../views/login/login.vue'),
	}

]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (!localStorage.getItem('token')) {
		if (to.name === 'login') {
			next()
		} else {
			logout(localStorage.getItem('username')!)
			localStorage.clear()
			router.push('login')
		}
	} else {
		next()
	}
})
export default router
