import { lyricType } from '@/assets/ts/myType'
import { defineStore } from 'pinia'

//定义容器
export const useMainStore = defineStore('main', {
	//存贮全局状态
	state: () => {
		return {
			//控制footer是否展示(主要用在首屏不展示)
			isShowFooter: false, //false
			//当前歌曲信息
			curMusicInfo: {
				name: "",
				artist: "",
				url: "",
				cover: "",
				index: 0,
				lyric: new Array<lyricType>(),
				curLyricIndex: 0
			}
		}
	},
	//封装计算属性computed
	getters: {
		lyricTranslateYStr(state) {
			return `transform: translateY(${95 - state.curMusicInfo.curLyricIndex * 67}px)`
		},

	},
	//封装业务逻辑
	actions: {
	}
})