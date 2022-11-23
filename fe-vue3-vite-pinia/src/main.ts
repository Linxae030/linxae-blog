import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
//引入element Plus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
// import vuetyped from 'vue3typed'

// markdown样式
import 'github-markdown-css'
// 代码高亮
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.css' //样式


//初始化样式
import './assets/css/reset.css'
import './assets/css/hover-min.css'
import './assets/iconfont/font_3505472_zhdpmai9c2j/iconfont.css'
//全局样式
const app = createApp(App)
const pinia = createPinia()
app.use(router).use(pinia).use(ElementPlus).mount('#app')
//创建v-highlight全局指令
app.directive('highlight', {
    mounted(el, bindings, vnode, preVnode) {
        let blocks = el.querySelectorAll('pre code');
        blocks.forEach((block: HTMLElement) => {
            hljs.highlightBlock(block)
        })
    }
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

