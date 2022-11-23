import { onMounted, ref } from 'vue';
import { tag, category } from '../../assets/ts/myInterface';
import { deleteCateApi, getTagsApi, addCateApi, updateCateApi,getCategoriesApi } from '../../api/articles/ArticlesApi';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ElLoading } from 'element-plus'
import router from '@/router';
export default function () {
    //搜索关键字
    const search = ref('')
    const visible = ref(false)
    const cateName = ref('')
    //是否加载
    let loading = ref(true)
    //展开文章数据
    const formLabelWidth = '100px'

    const cateList = ref<category[]>([])
    //添加标签
    async function handleAdd() {
        let data = await addCateApi(cateName.value)
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
                let data = await deleteCateApi(row.id)
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
        ElMessageBox.prompt('请输入新分类名', '编辑', {
            confirmButtonText: '保存',
            cancelButtonText: '取消',
        })
            .then(async ({ value }) => {
                let data = await updateCateApi(row.id, value)
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
        let cateData = await getCategoriesApi()
        // @ts-ignore
        cateList.value = cateData.categories
        loading.close()

        // Loading should be closed asynchronously



    }
    onMounted(() => {
        getTagsAndCate()
    })



    return {
        search, loading, cateList, visible, cateName,
        formLabelWidth, handleDelete, handleAdd, handleEdit
    }
}