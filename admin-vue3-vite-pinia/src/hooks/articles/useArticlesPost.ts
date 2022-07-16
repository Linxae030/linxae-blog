import { onMounted, reactive, ref, toRaw } from 'vue';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
import { category, tag } from '@/assets/ts/myInterface';
import { getTagsApi, getCategoriesApi } from '@/api/articles/useArticlesPost'
export default function () {
    //详细信息框是否显示
    const dialogFormVisible = ref(true)
    const formLabelWidth = '200px'
    const formData = reactive({
        //选中的分类
        cateSelected: '',
        cateList: new Array<category>(),
        //选中的标签
        tagSelected: new Array<tag>(),
        tagList: new Array<tag>(),

    })
    //文章标题
    let inputTitle = ref("")
    //markdown内容
    let markdown = ref("")
    //发布文章
    function handlePost() {
        const html = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(markdown.value));
    }
    //获取分类和标签
    async function getTagsAndCate() {
        let tagsData = await getTagsApi()
        let categoriesData = await getCategoriesApi()
        // @ts-ignore
        formData.cateList = categoriesData.categories
        // @ts-ignore
        formData.tagList = tagsData.tags

    }
    onMounted(() => {
        getTagsAndCate()
    })

    return { inputTitle, markdown, formData, formLabelWidth, dialogFormVisible, handlePost, }
}