import request_form from '@/config/axios/configReqForm';
import request_json from '@/config/axios/configReqJson';
import { article, draft, tag } from '../../assets/ts/myInterface';

//获取标签
export function getTagsApi() {
    return request_form.get('articles/tags');
}
//删除标签
export function deleteTagApi(id: number) {
    return request_form.post(`articles/deleteTag?id=${id}`);
}
//添加标签
export function addTagApi(tagName: string) {
    return request_form.post(`articles/addTag`, {
        tag_name: tagName
    });
}
//更新标签
export function updateTagApi(id: number, tagName: string) {
    return request_form.post(`articles/updateTag`, {
        id,
        tagName
    });
}
//根据id获取标签
export function getTagsByIdApi(id: number) {
    return request_form.get(`articles/getTagsById?id=${id}`);
}
//获取分类
export function getCategoriesApi() {
    return request_form.get('articles/categories');
}
//删除分类
export function deleteCateApi(id: number) {
    return request_form.post(`articles/deleteCategory?id=${id}`);
}
//添加分类
export function addCateApi(cateName: string) {
    return request_form.post(`articles/addCategory`, {
        cate_name: cateName
    });
}
//更新分类
export function updateCateApi(id: number, cateName: string) {
    return request_form.post(`articles/updateCategory`, {
        id,
        cateName
    });
}
//发布文章
export function postArticleApi(article: article) {
    return request_json.post('articles/postArticle', {
        category_id: article.category_id,
        article_cover: article.article_cover,
        article_title: article.article_title,
        article_content: article.article_content,
        article_content_md: article.article_content_md,
        type: article.type,
        is_top: article.is_top,
        tag_list: JSON.stringify(article.tag_list)
    });
}
//更新文章
export function updateArticleApi(article: article) {
    return request_json.post('articles/updateArticle', {
        id: article.id,
        category_id: article.category_id,
        article_cover: article.article_cover,
        article_title: article.article_title,
        article_content: article.article_content,
        article_content_md: article.article_content_md,
        type: article.type,
        is_top: article.is_top,
        tag_list: JSON.stringify(article.tag_list)
    });
}

//获取文章
export function getArticleListApi() {
    return request_json.get('articles/getArticleList')
}
//获取文章部分内容
export function getArticlePartListApi() {
    return request_json.get('articles/getArticlePartList')
}
//根据Id获取文章
export function getArticleByIdApi(id: number) {
    return request_json.get(`articles/getArticleById?id=${id}`,)
}
//删除文章
export function deleteArticleApi(id: number) {
    return request_json.post(`articles/deleteArticle?id=${id}`,)
}
//保存草稿
export function postDraftApi(draft: draft) {
    return request_json.post('articles/postDraft', draft)
}
//获取草稿·
export function getDraftApi() {
    return request_json.get('articles/getDraft')
}