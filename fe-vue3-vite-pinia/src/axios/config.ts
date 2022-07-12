// /**
// * 封装axios
// */

// import axios from 'axios' //引入axios的第三方插件
// //  1.创建axios实列
// const service = axios.create({
//     // A.公共接口
//     baseURL: process.env.BASE_API,
//     // B.设置接口请求超时
//     timeout: 6 * 1000
// })
// console.log("11", service);

// // 2.用创建的axios实例生成请求拦截器
// service.interceptors.request.use(config => {
//     // 在发送请求之前带上一些东西，config是请求的配置对象，如果直接返回就等于什么都不带
//     let token = window.localStorage.token;
//     if (token) {
//         config.headers.Authorization = 'Bearer' + token; //如果token 存在，就带上token

//     } else {
//         config.headers['token'] = ''; //return
//     }
//     return config;
// }, error => {
//     return Promise.reject(error); //请求错误处理
// });

// // 3.用创建的axios实例生成响应拦截器
// service.interceptors.response.use(response => {
//     let {
//         code,
//         msg
//     } = response.data;
//     if (code == 0) {
//         Message({
//             type: success,
//             message: msg
//         })
//     } else {
//         Message.error(msg)
//     }

//     return response;
// }, error => {
//     Message.error('网络请求发生错误，请稍后再试')
//     return Promise.reject(error)
// })

// // 导出两个请求方法
// export default {
//     get(url, params = {}) {
//         return new Promise((resolve, reject) => {
//             axios.get(url, {
//                 params
//             })
//                 .then(res => {
//                     resolve(res.data)
//                 })

//                 .catch(err => {
//                     reject(err)
//                 })
//         })
//     },
//     post(url, params = {}) {
//         return new Promise((resolve, reject) => {
//             axios.post(url, qs.stringify(params))
//                 .then(res => {
//                     resolve(res.data)
//                 })

//                 .catch(err => {
//                     reject(err)
//                 })
//         })
//     }
// }


