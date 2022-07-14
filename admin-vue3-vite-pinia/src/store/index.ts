import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
//引入element Plus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
//初始化样式
import './assets/css/reset.css'
import './assets/css/hover-min.css'
//全局样
const app = createApp(App)
const pinia = createPinia()
app.use(router).use(pinia).use(ElementPlus).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}