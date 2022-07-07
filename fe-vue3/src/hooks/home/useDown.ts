import { onMounted, ref } from "vue";
export default function () {
	let showDownMain = ref(false);
	let showScene = ref(true);
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
		}, 600)
	}
	return { showDownMain, showScene, handleClick };
}
