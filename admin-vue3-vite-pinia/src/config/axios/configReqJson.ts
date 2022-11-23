import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import qs from 'qs'
const isDev = process.env.NODE_ENV == 'development'

const request_json = axios.create({
    baseURL: isDev ? 'http://localhost:3008' : '',
    timeout: 30000,
})
//请求拦截器
request_json.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) {
        config.headers['Authorization'] = localStorage.getItem('token') || ''
        config.data = qs.stringify(config.data)
    }
    return config
}, (error: any) => {
    return Promise.reject(error)
})
//响应拦截器
request_json.interceptors.response.use((response: AxiosResponse) => {
    return response.data
}, (error: any) => {
    return Promise.reject(error)
})
export default request_json
