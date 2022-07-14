import { sideNavBarItem } from '../../assets/ts/myInterface';
export default function () {
    let list: sideNavBarItem[] = [{
        index: 1,
        icon: "HomeFilled",
        title: "主页",
        path: ''
    }, {
        index: 2,
        icon: "Document",
        title: "文章管理",
        path: '',
        children: [{
            index: 1,
            icon: "DocumentAdd",
            title: "文章发布",
            path: 'articlesPost'
        }, {
            index: 2,
            icon: "DocumentChecked",
            title: "文章列表",
            path: ''
        }, {
            index: 3,
            icon: "PriceTag",
            title: "标签管理",
            path: ''
        }, {
            index: 4,
            icon: "Menu",
            title: "分类管理",
            path: ''
        }]
    }]
    return list
}