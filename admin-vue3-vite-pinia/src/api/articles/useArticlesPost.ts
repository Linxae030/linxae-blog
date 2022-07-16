import request_form from '@/config/axios/config';

export function getTagsApi() {
    return request_form.get('articles/tags');
}
export function getCategoriesApi() {
    return request_form.get('articles/categories');
}