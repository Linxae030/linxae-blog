import { useMainStore } from "../../store";
import { onUnmounted } from "vue";
export default function () {
    let mainStore = useMainStore();
    onUnmounted(() => {
        mainStore.isShowFooter = true;
    })
}
