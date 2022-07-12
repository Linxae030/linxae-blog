import { onMounted, ref } from "vue";
import { useMainStore } from "../../store";
export default function () {
	let showDownMain = ref(false);
	let showScene = ref(true);
	let mainStore = useMainStore();
	mainStore.isShowFooter = false;
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
			mainStore.isShowFooter = true;
		}, 700)
	}
	return { showDownMain, showScene, handleClick };
}
