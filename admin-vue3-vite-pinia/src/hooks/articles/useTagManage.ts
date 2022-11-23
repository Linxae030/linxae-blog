import { onMounted, ref } from 'vue';
import { tag } from '../../assets/ts/myInterface';
import { deleteTagApi, getTagsApi, addTagApi, updateTagApi } from '../../api/articles/ArticlesApi';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ElLoading } from 'element-plus'
import router from '@/router';
export default function () {
    //搜索关键字
    const search = ref('')
    const visible = ref(false)
    const tagName = ref('')
    //是否加载
    let loading = ref(true)
    //展开文章数据
    const formLabelWidth = '100px'

    const tagList = ref<tag[]>([])
    //添加标签
    async function handleAdd() {
        let data = await addTagApi(tagName.value)
        if (data.status === 1) {
            ElMessage({
                type: 'error',
                // @ts-ignore
                message: data.message,
            })
        } else {
            ElMessage({
                type: 'success',
                // @ts-ignore
                message: data.message,
            })
            setInterval(() => {
                router.go(0)
            }, 500)
        }


    }
    //删除标签
    const handleDelete = async (index: number, row: tag) => {
        // @ts-ignore
        ElMessageBox.confirm(
            '是否确认删除该标签?',
            'Warning',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                let data = await deleteTagApi(row.id)
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
    //修改标签名称
    const handleEdit = async (index: number, row: tag) => {
        // @ts-ignore
        ElMessageBox.prompt('请输入新标签名', '编辑', {
            confirmButtonText: '保存',
            cancelButtonText: '取消',
        })
            .then(async ({ value }) => {
                let data = await updateTagApi(row.id, value)
                if (data.status === 1) {
                    ElMessage({
                        type: 'error',
                        // @ts-ignore
                        message: data.message,
                    })
                } else {
                    ElMessage({
                        type: 'success',
                        // @ts-ignore
                        message: data.message,
                    })
                    setInterval(() => {
                        router.go(0)
                    }, 500)
                }

            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消编辑',
                })
            })

    }
    //获取分类和标签
    async function getTagsAndCate() {
        const loading = ElLoading.service({
            target: '.el-table',
            text: '加载中，请稍后'
        })
        let tagsData = await getTagsApi()
        // @ts-ignore
        tagList.value = tagsData.tags
        loading.close()

    }
    onMounted(() => {
        getTagsAndCate()
    })



    return {
        search, loading, tagList, visible, tagName,
        formLabelWidth, handleDelete, handleAdd, handleEdit
    }
}