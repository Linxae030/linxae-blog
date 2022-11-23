import { computed, onMounted, ref, reactive, toRaw } from 'vue';
import { article, category, tag } from '../../assets/ts/myInterface';
import { getArticlePartListApi, getCategoriesApi, deleteArticleApi, getArticleByIdApi, getTagsApi, getTagsByIdApi, postArticleApi, updateArticleApi } from '../../api/articles/ArticlesApi';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import router from '@/router';
export default function () {
    //文章列表
    let tableData = ref([])
    //搜索关键字
    const search = ref('')
    //是否展开子菜单
    let expand = ref([])
    //展开文章数据
    const formLabelWidth = '100px'
    const formData = reactive({
        id: '',
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
    //文件列表
    let files = []
    //更新文章
    async function handleUpdate(uploadRef: any) {
        if (files.length != 0) {
            uploadRef.value!.submit()
        }
        else {
            //markdown转html文本字符串
            const html = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(markdown.value));
            //定义文章对象
            let articleObj: article = {
                id: parseInt(formData.id),
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
            let data = await updateArticleApi(articleObj)
            if (data.status === 0) {
                ElMessage({
                    message: '文章更新成功!',
                    type: 'success',
                })
                setTimeout(() => {
                    router.go(0)
                }, 500)
            }
        }
    }
    function onChange(file: any, fileList: any) {
        files = fileList
    }
    //文件上传后的回调
    async function handleUpSuccess(res: { newUrl: string; }) {
        //获取coverUrl
        formData.coverUrl = res.newUrl
        //markdown转html文本字符串
        const html = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(markdown.value));
        //定义文章对象
        let articleObj: article = {
            id: parseInt(formData.id),
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
        let data = await updateArticleApi(articleObj)
        if (data.status === 0) {
            ElMessage({
                message: '文章更新成功!',
                type: 'success',
            })
            setTimeout(() => {
                router.go(0)
            }, 500)
        }
    }
    //获取部分文章数据
    async function getArticlePartList() {
        const loading = ElLoading.service({
            target: '.el-table',
            text: '加载中，请稍后'
        })
        let data = await getArticlePartListApi()
        let categories = await getCategoriesApi()
        // @ts-ignore
        tableData.value = data.articleList
        loading.close()
        let index = 0
        tableData.value.forEach(async article => {
            // @ts-ignore
            article.type = await convertIntToString('type', article.type)
            // @ts-ignore
            article.category_id = await convertIntToString('cate', article.category_id, categories)
            // @ts-ignore
            article.is_top = await convertIntToString('top', article.is_top)
            // @ts-ignore
            article.index = index;
            index++;
        })


    }
    //获取文章详细数据
    async function getArticleInfo() {
        let data = await getArticlePartListApi()
    }
    //根据id获取文章 
    async function getArticleById(id: number) {
        let data = await getArticleByIdApi(id)
        //@ts-ignore
        inputTitle.value = data.article.article_title
        //@ts-ignore
        markdown.value = data.article.article_content_md
        //@ts-ignore
        formData.cateSelected = data.article.category_id
        //@ts-ignore
        formData.isTop = data.article.is_top
        //@ts-ignore
        formData.type = data.article.type
        //@ts-ignore
        formData.coverUrl = data.article.article_cover
        //@ts-ignore
        formData.id = data.article.id
        getArticleTags(id)
    }
    //获取文章tgs
    async function getArticleTags(id: number) {
        let data = await getTagsByIdApi(id)
        //@ts-ignore
        for (let index = 0; index < data.tags.length; index++) {
            //@ts-ignore
            formData.tagSelected[index] = data.tags[index].id
        }
    }
    //文章删除
    const handleDelete = async (index: number, row: article) => {
        ElMessageBox.confirm(
            '是否确认删除该文章?',
            'Warning',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                let data = await deleteArticleApi(row.id!)
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
                setInterval(() => {
                    router.go(0)
                }, 500)
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '删除失败',
                })
            })
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
        getArticlePartList()
        getTagsAndCate()
    })
    //控制只有一行展开
    async function clickRowHandle(row: any) {

        // @ts-ignore
        if (expand.value) {
            if (expand.value[0] === row.index) {
                expand.value = []
                // @ts-ignore
                return;
            }
        } // @ts-ignore
        expand.value = [row.index]
        //获取数据
        getArticleById(row.id)


    }
    //转换类型
    async function convertIntToString(type: string, value: number, categories?: []) {
        if (type === 'type') {
            switch (value) {
                case 1:
                    return '原创'
                case 2:
                    return '转载'
                case 3:
                    return '翻译'
                default:
                    return '未知类型'
            }
        }
        else if (type == 'cate') {

            // @ts-ignore
            for (let index = 0; index < categories.length; index++) {
                // @ts-ignore
                if (categories[index].id === value) {
                    // @ts-ignore
                    return categories[index].category_name
                }
            }
            return '未知分类'
        } else if (type == 'top') {
            switch (value) {
                case 0:
                    return '普通'
                case 1:
                    return '置顶'
            }
        }
    }
    return {
        tableData, search, expand, inputTitle,
        markdown,
        formData,
        formLabelWidth, handleUpdate, clickRowHandle, handleUpSuccess, handleDelete, onChange
    }
}