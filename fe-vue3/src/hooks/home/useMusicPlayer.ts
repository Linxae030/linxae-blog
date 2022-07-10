import { search, getSongDetail, getAlbumInfo, getSongUrl, loginByPhone, getPlaylist, getAllPlaylistTrack, logout } from "@/api/home/musicApi";
import { onMounted, reactive, ref } from "vue";
import useMusicController from "@/hooks/home/useMusicController";
export default function () {
    let uid = '612434676';
    let account = '18581531304'
    let pwd = 'gg123456'
    let cookie = "MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/neapi/feedback;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/api/clientlog;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/eapi/feedback;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/eapi/feedback;;__remember_me=true; Max-Age=1296000; Expires=Sun, 24 Jul 2022 08:37:15 GMT; Path=/;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/weapi/feedback;;MUSIC_SNS=; Max-Age=0; Expires=Sat, 09 Jul 2022 08:37:15 GMT; Path=/;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/neapi/feedback;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/wapi/feedback;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/weapi/feedback;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/wapi/feedback;;__csrf=e7d2a0973f37d1bff4e7b76014c5fefc; Max-Age=1296010; Expires=Sun, 24 Jul 2022 08:37:25 GMT; Path=/;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/api/feedback;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/api/clientlog;;MUSIC_R_T=1507340042140; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/api/feedback;;NMTID=00OJvJMdUUcYWc-hEcTmn2s7A-I7OcAAAGB4hsYYw; Max-Age=315360000; Expires=Tue, 06 Jul 2032 08:37:15 GMT; Path=/;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/wapi/clientlog;;MUSIC_U=3f5df6eb7dafcace3b038d95dc6f701623a249945d51e9d19fd44cfba8632c961e8907c67206e1ed251a916b45c5617a80c535cda53d031a3d84f4bc47ed027f8349cb7bce9ea511a89fe7c55eac81f3; Max-Age=1296000; Expires=Sun, 24 Jul 2022 08:37:15 GMT; Path=/;;MUSIC_A_T=1507340016930; Max-Age=2147483647; Expires=Thu, 27 Jul 2090 11:51:22 GMT; Path=/weapi/clientlog;"
    let MusicList: any = ref([])
    let audioMedia: any;
    let curMusicInfo = reactive({
        curMusicName: "",
        curMusicArtist: "",
        curMusicUrl: "",
        curMusicCover: ""
    })
    async function getMusicList() {
        let res = await getPlaylist(uid)
        let playlistId = res.data.playlist[0].id
        let data = await getAllPlaylistTrack(playlistId, cookie)
        MusicList.value = data.data.songs

    }
    async function selectMusicById(id: string) {
        console.log('id', id)
        let data = await getSongUrl(id)
        curMusicInfo.curMusicUrl = data.data.data[0].url
        let detail = await getSongDetail(id)
        curMusicInfo.curMusicName = detail.data.songs[0].name
        curMusicInfo.curMusicArtist = joinArtistName(detail.data.songs[0].ar)
        curMusicInfo.curMusicCover = detail.data.songs[0].al.picUrl
        useMusicController().changePause(false)

    }
    onMounted(async () => {
        // //登录
        // let loginRes = await loginByPhone(account, pwd)
        // cookie = loginRes.data.cookie;
        // console.log('loginRes', loginRes)
        getMusicList()
        audioMedia = document.querySelector("#audioTag");

    })
    function joinArtistName(Artists: any[]) {
        let separate = '/'
        let link = Artists[0].name
        for (var i = 1; i < Artists.length; i++) {
            link += separate + Artists[i].name;
        }
        return link
    }
    // onMounted(async () => {
    //     let res = await getPlaylist(uid)
    //     console.log('res', res)+
    // })
    return { curMusicInfo, MusicList, selectMusicById, joinArtistName }

}