
import { defineStore } from 'pinia'
//定义容器
export const useMainStore = defineStore('main', {
    //存贮全局状态
    state: () => {
        return {
            //控制footer是否展示(主要用在首屏不展示)
            isShowFooter: false, //false

        }
    },
    //封装计算属性computed
    getters: {

    },
    //封装业务逻辑
    actions: {
    }
})