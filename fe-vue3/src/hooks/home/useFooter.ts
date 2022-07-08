import { useStore } from "vuex";
import { onUnmounted } from "vue";
export default function () {
    let store = useStore();
    onUnmounted(() => {
        store.state.isShowFooter = true;
    })
}
