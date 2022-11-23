import { onMounted, reactive, ref, toRaw } from 'vue';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
import { category, tag } from '@/assets/ts/myInterface';
import { getTagsApi, getCategoriesApi, postArticleApi, postDraftApi, getDraftApi } from '@/api/articles/ArticlesApi'
import { ElMessage, UploadFile, UploadInstance, UploadProps } from 'element-plus';
import { article, draft } from '../../assets/ts/myInterface';
import router from '@/router';

export default function () {
    //详细信息框是否显示
    const dialogFormVisible = ref(false)
    const formLabelWidth = '100px'
    const formData = reactive({
        //选中的分类
        cateSelected: '',
        cateList: new Array<category>(),
        //选中的标签
        tagSelected: [],
        tagList: new Array<tag>(),
        isTop: '',
        type: '',
        coverUrl: '',
    })
    //文章标题
    let inputTitle = ref("")
    //markdown内容
    let markdown = ref("")
    //发布文章
    function handlePost(uploadRef: any) {
        uploadRef.value!.submit()
    }
    //文件上传成功的回调
    async function handleUpSuccess(res: any) {
        //获取coverUrl
        formData.coverUrl = res.newUrl
        //markdown转html文本字符串
        const html = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(markdown.value));
        //定义文章对象
        let articleObj: article = {

            category_id: parseInt(formData.cateSelected),
            article_cover: formData.coverUrl,
            article_title: toRaw(inputTitle).value,
            article_content: html,
            article_content_md: markdown.value,
            type: parseInt(formData.type),
            is_top: parseInt(formData.isTop),
            //去除响应式
            tag_list: [...toRaw(formData.tagSelected)]
        }
        let data = await postArticleApi(articleObj)
        if (data.status === 0) {
            ElMessage({
                message: '文章上传成功!',
                type: 'success',
            })
            setTimeout(() => {
                router.go(0)
            }, 500)
        }
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
    //上传草稿
    async function postDraft() {
        //markdown转html文本字符串
        let draft: draft = {
            article_title: inputTitle.value,
            article_content: markdown.value
        }
        let data = await postDraftApi(draft)
        if (data.status === 0) {
            ElMessage({
                //@ts-ignore
                message: data.message,
                type: 'success',
            })

        }
    }
    //获取草稿
    async function getDraft() {
        let data = await getDraftApi()
        if (inputTitle.value)
            //@ts-ignore
            inputTitle.value = data.draft.article_title
        if (markdown.value)
            //@ts-ignore
            markdown.value = data.draft.article_content
    }

    onMounted(() => {
        getTagsAndCate()
        getDraft()
    })

    return {
        inputTitle, markdown, formData, formLabelWidth, dialogFormVisible, handlePost, handleUpSuccess, postDraft
    }
}