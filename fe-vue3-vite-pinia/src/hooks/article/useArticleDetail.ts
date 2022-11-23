import { useRoute } from "vue-router";
import { onMounted } from 'vue';
import { getArticleByIdApi } from '@/api/article/articlesApi'

export default function () {
    const route = useRoute();
    const id = <number><unknown>route.query.id
    async function getArticleInfo() {
        let data = await getArticleByIdApi(id)
        console.log('data', data)
    }

    onMounted(() => {
        getArticleInfo()
    })
}