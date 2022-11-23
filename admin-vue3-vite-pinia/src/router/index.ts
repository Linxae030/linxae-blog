import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { logout } from '@/api/login/login&registerApi'
const routes: Array<RouteRecordRaw> = [
	{
		name: 'home',
		path: '/',
		component: () => import('../views/home/home.vue'),
		meta: {
			title: '首页'
		},
		children: [{
			name: 'articlesPost',
			path: 'articlesPost',
			meta: {
				title: '文章发布'
			},
			component: () => import('../views/articles/articlesPost.vue'),
		},
		{
			name: 'articlesList',
			path: 'articlesList',
			meta: {
				title: '文章列表'
			},
			component: () => import('../views/articles/articlesList.vue'),
		}, {
			name: 'tagManage',
			path: 'tagManage',
			meta: {
				title: '标签管理'
			},
			component: () => import('../views/articles/tagManage.vue'),
		}, {
			name: 'sortManage',
			path: 'sortManage',
			meta: {
				title: '分类管理'
			},
			component: () => import('../views/articles/sortManage.vue'),
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
