import { getArticleListApi, getTagsByIdApi } from '@/api/home/articlesApi'
import { article } from '@/assets/ts/myType'
import { onMounted, ref } from 'vue'
export default function () {
    let articleList = ref<article[]>([])

    const getArticleList = async () => {
        let data = await getArticleListApi()
        // @ts-ignore
        articleList.value = data.articleList
        articleList.value.forEach(async article => {
            let data = await getTagsByIdApi(article.id!)
            // @ts-ignore
            article.tag_list = data.tags
        })
        //寻找置顶
        let topIndex = articleList.value.findIndex(article => {
            return article.is_top === 1
        })
        let temp = articleList.value.splice(topIndex, 1)
        articleList.value.unshift(temp[0])

    }

    onMounted(() => {
        getArticleList()
    })
    return { articleList }
}