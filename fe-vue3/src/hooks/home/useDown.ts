import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default function () {
	let showDownMain = ref(false);
	let showScene = ref(true);
	let store = useStore();
	store.state.isShowFooter = false;
	function handleClick() {
		showDownMain.value = true
		setTimeout(() => {
			window.scrollTo({
				behavior: "smooth",
				top: document.documentElement.clientHeight,
			});
		}, 10)
		setTimeout(() => {
			showScene.value = false
			store.state.isShowFooter = true;
		}, 680)
	}
	return { showDownMain, showScene, handleClick };
}
