import request_form from '@/axios/configReqForm'

import request_json from '@/axios/configReqJson'
//获取文章
export function getArticleListApi() {
    return request_json.get('articles/getArticleList')
}

//根据id获取标签
export function getTagsByIdApi(id: number) {
    return request_form.get(`articles/getTagsById?id=${id}`);
}