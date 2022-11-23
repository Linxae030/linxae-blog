import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue';
export default function () {
    const router = useRouter();
    let list = computed(() => {
        return router.currentRoute.value.matched
    })
    return { list };
}