import axios from 'axios' //引入axios的第三方插件
const baseURL = 'http://localhost:3000'
const request = axios.create({
    // A.公共接口
    baseURL,
})
//根据关键词查歌
export function search(keyWord: string) {
    return request.get(`search?keywords=${keyWord}`)
}
//手机登录
export function loginByPhone(phone: string, pwd: string) {
    return request.get(`/login/cellphone?phone=${phone}&password=${pwd}`)
}
//登出
export function logout() {
    return request.get(`/logout`)
}
//获取歌单列表
export function getPlaylist(uid: string) {
    return request.get(`/user/playlist?uid=${uid}`)
}
//获取某歌单全部歌曲
export function getAllPlaylistTrack(tid: string, cookie: any) {

    return request.get(`/playlist/track/all?id=${tid}&limit=500&offset=0&cookie=${cookie}`)
}
//获取歌曲url
export function getSongUrl(id: string) {
    return request.get(`/song/url?id=${id}`)
}
//获取歌曲详情
export function getSongDetail(id: string) {
    return request.get(`/song/detail?ids=${id}`)
}
//获取专辑内容
export function getAlbumInfo(id: string) {
    return request.get(`/album?id=${id}`)
}