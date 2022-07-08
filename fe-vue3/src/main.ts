import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element Plus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import vuetyped from 'vue3typed'
//初始化样式
import './assets/css/reset.css'
import './assets/css/hover-min.css'
import './assets/iconfont/font_3505472_zhdpmai9c2j/iconfont.css'
//全局样式
const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(vuetyped).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}