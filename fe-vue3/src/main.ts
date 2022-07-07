import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入antDesign
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import vuetyped from 'vue3typed'
//初始化样式
import './assets/css/reset.css'
import './assets/css/hover-min.css'
import './assets/iconfont/font_3505472_zhdpmai9c2j/iconfont.css'
//全局样式

createApp(App).use(store).use(router).use(Antd).use(vuetyped).mount('#app')
