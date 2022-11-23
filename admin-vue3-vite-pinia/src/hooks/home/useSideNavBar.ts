import { sideNavBarItem } from '../../assets/ts/myInterface';
import { useRouter } from 'vue-router'
import { onMounted, ref, toRaw } from 'vue';
export default function () {
    let itemList: sideNavBarItem[] = [{
        index: 1,
        icon: "HomeFilled",
        title: "主页",
        path: '/'
    }, {
        index: 2,
        icon: "Document",
        title: "文章管理",
        path: '',
        children: [{
            index: 1,
            icon: "DocumentAdd",
            title: "文章发布",
            path: '/articlesPost'
        }, {
            index: 2,
            icon: "DocumentChecked",
            title: "文章列表",
            path: '/articlesList'
        }, {
            index: 3,
            icon: "PriceTag",
            title: "标签管理",
            path: '/tagManage'
        }, {
            index: 4,
            icon: "Menu",
            title: "分类管理",
            path: '/sortManage'
        }]
    }]
    let curActive = ref('')
    const router = useRouter()
    onMounted(() => {
        // @ts-ignore
        curActive.value = router.currentRoute.value.path
    })
    return { itemList, curActive }
}