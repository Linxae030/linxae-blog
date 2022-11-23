import request_form from '@/axios/configReqForm'

import request_json from '@/axios/configReqJson'
//根据Id获取文章
export function getArticleByIdApi(id: number) {
    return request_json.get(`articles/getArticleById?id=${id}`,)
}