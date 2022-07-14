import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
//引入element Plus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import se from 'super-element-components'
import 'super-element-components/style.css'
//初始化样式
import './assets/css/reset.css'
import './assets/css/hover-min.css'

//markdown引入
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

//全局样式
const app = createApp(App)
const pinia = createPinia()
//语法高亮选择prismjs
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
// app.use(vuetyped)
app.use(router).use(pinia).use(ElementPlus).use(VueMarkdownEditor).use(se).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}