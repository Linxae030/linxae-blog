import { onMounted, reactive, ref, toRaw } from "vue";
import { useMainStore } from "@/store"
import { storeToRefs } from "pinia";
export default function () {
	let audio = reactive({
		// 该字段是音频是否处于播放状态的属性
		playing: false,
		// 音频最大播放时长
		Duration: 0,
		currentDuration: 0,
		//是否在移动
		isMove: false,
	});
	const mainStore = useMainStore()
	let { curMusicInfo } = storeToRefs(mainStore)
	let isActive = ref('')
	let audioMedia: any;
	let progress: any;
	let currentProgress: any;
	let circle: any;
	//切换播放暂停
	function changePause(state: boolean) {
		if (state) {
			audio.playing = false;
			audioMedia.pause();
		} else {
			audio.playing = true;
			audioMedia.play();
		}
	}
	//下一曲
	//将duration转化成整数转分钟：秒形式
	function realFormatSecond(second: any) {
		let secondType = typeof second;
		if (secondType === "number" || secondType === "string") {
			second = parseInt(second);
			let hours = Math.floor(second / 3600);
			second = second - hours * 3600;
			let mimute = Math.floor(second / 60);
			second = second - mimute * 60;
			// hours + ':' +
			return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
		} else {
			return "0:00:00";
		}
	}
	//媒体加载完毕第一帧执行将duration转化成整数,自动播放
	function onLoadedmetadata(e: any) {
		audio.Duration = parseInt(e.target.duration)
		audioMedia.play();
		audio.playing = true;
		isActive.value = 'active'
	}
	//更新现在时间
	function updateTime(e: any) {
		if (!progress) return
		audio.currentDuration = parseInt(audioMedia.currentTime)
		//如果不是正在移动 和 没有暂停播放就执行
		if (!audio.isMove || !audioMedia.paused) {
			// 设置当前时间
			let MoveX = progress.clientWidth * (audioMedia.currentTime / audio.Duration)
			//播放时更新距离
			currentProgress.style.width = MoveX + 'px'
			circle.style.left = MoveX - (circle.clientWidth / 2) + 'px'
		}
		updateProgressRoll()
	}
	//更新进度条滚动
	function updateProgressRoll() {
		let curObj = curMusicInfo.value.lyric.find((item) => {
			return Math.trunc(item.time) == audio.currentDuration
		})
		if (curObj)
			curMusicInfo.value.curLyricIndex = curObj.index
	}
	//点击时更新歌词
	function updateLyricByClick() {
		let curObj = curMusicInfo.value.lyric.find((item) => {
			return Math.round(item.time) > audio.currentDuration
		})
		curMusicInfo.value.curLyricIndex = curObj!.index - 1
	}
	//点击进度条更新进度
	function clickProgress(e: any) {
		//如果不是正在移动 和 没有暂停播放就执行
		if (!audio.isMove || !audioMedia.paused) {
			updateProgress(e.offsetX)
		}
	}
	//更新进度
	function updateProgress(MoveX: number) {
		//当前移动的位置 = 当前移动的位置 / 当前进度条的可视长度    //progress.clientWidth 注意一定要拿总长度 否则会拿进度条已经走过的长度
		let clickProgress = (MoveX / progress.clientWidth)
		//设置播放的时间 = 总时长 * 当前点击的长度
		audioMedia.currentTime = audio.Duration * clickProgress
		//设置移动的位置
		currentProgress.style.width = MoveX + 'px'
		circle.style.left = MoveX - 13 + 'px'
		audio.currentDuration = parseInt(audioMedia.currentTime)
		updateLyricByClick()
	}
	//鼠标弹起
	function handleMouseup() {
		setTimeout(() => {
			audioMedia.play()
			audio.playing = true
			audio.isMove = false
		}, 200)

	}
	function handleMousedown(e: any) {
		let newLeft = circle.offsetLeft + e.offsetX - (circle.clientWidth) - 1
		circle.style.left = newLeft + 'px'
		audioMedia.pause()
		audio.playing = false
		audio.isMove = true
		let moveMin = 0
		//进度条 右 边距离页面左边的距离 移动最大值
		let moveMax = progress.clientWidth
		//小圆圈的宽度
		audio.currentDuration = parseInt(audioMedia.currentTime)
		updateLyricByClick()
		let move = (move: any) => {
			if (move.target === circle) {
				return
			}
			if (move.offsetX >= moveMax) {
				return
			} else if (move.offsetX <= moveMin) {
				return
			}
			circle.style.left = move.offsetX - 13 + 'px'
			updateProgress(move.offsetX)
		}
		//获取当前鼠标的位置 X
		document.addEventListener('mousemove', move)
		var isFirst = true
		document.addEventListener('mouseup', () => {
			if (isFirst) {
				document.removeEventListener('mousemove', move)
				// @ts-ignore
				handleMouseup()
				isFirst = false
			} else {
				return
			}

		})
	}

	onMounted(() => {
		audioMedia = document.querySelector("#audioTag");
		progress = document.querySelector("#progress");
		circle = document.querySelector("#circle");
		currentProgress = document.querySelector("#currentProgress");
	});

	return { audio, isActive, changePause, onplay, onLoadedmetadata, clickProgress, handleMousedown, handleMouseup, updateTime, realFormatSecond };
}
