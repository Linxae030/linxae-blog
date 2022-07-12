import { search, getSongDetail, getLyric, getLoginState, getAlbumInfo, getSongUrl, loginByPhone, getPlaylist, getAllPlaylistTrack, logout } from "../../api/home/musicApi";
import { onMounted, reactive, ref, computed } from "vue";
import { useMainStore } from "../../store"
import { lyricType } from "@/assets/ts/myType";
export default function () {
    let uid = '612434676';
    let account = '18581531304'
    let pwd = 'gg123456'
    let MusicList: any = ref([])
    let audioMedia: any;
    const mainStore = useMainStore();
    //上一曲
    function playPrev() {
        if (mainStore.curMusicInfo.index === 0) {
            return;
        }
        mainStore.curMusicInfo.index--;
        let curMusic = MusicList.value[mainStore.curMusicInfo.index]
        selectMusicById(curMusic.id, curMusic.index)
    }
    //下一曲
    function playNext() {
        //为毛要-1？？
        if (mainStore.curMusicInfo.index === MusicList.value.length - 1) {
            return;
        }
        mainStore.curMusicInfo.index++;
        let curMusic = MusicList.value[mainStore.curMusicInfo.index]
        selectMusicById(curMusic.id, curMusic.index)

    }
    //自动下一曲
    function nextMusic() {
        mainStore.curMusicInfo.index++;
        let curMusic = MusicList.value[mainStore.curMusicInfo.index]
        selectMusicById(curMusic.id, curMusic.index)
    }
    //获取歌曲列表
    async function getMusicList() {
        let res = await getPlaylist(uid)
        let playlistId = res.data.playlist[1].id
        let data = await getAllPlaylistTrack(playlistId, localStorage.getItem('cookie'))
        //自动播放第一首
        selectMusicById(data.data.songs[0].id, 0)
        let temp = data.data.songs
        let index = 0
        //@ts-ignore
        temp.forEach(element => {
            element.index = index
            index++
        });
        MusicList.value = temp
    }
    async function getLyrics(id: string): Promise<lyricType[]> {
        let res = await getLyric(id)
        let lyric = res.data.lrc.lyric
        let transLyric
        console.log('res.data.tlyric.lyric', res.data.tlyric)
        if (res.data.tlyric)
            transLyric = res.data.tlyric.lyric
        return handleLyric(lyric, transLyric)

    }
    //处理歌词
    function handleLyric(lyric: string, cnLyric: string = '') {
        console.log('.. ', cnLyric)
        //匹配时间
        let regTime = /\[(\d{2}:\d{2})\.\d{2,3}\](.+)/;
        //歌词单行数组
        let lines = lyric.split('\n')
        let transLines = cnLyric.split('\n')
        let lyricArr: lyricType[] = []
        if (lines.length === 1) {
            let obj = {
                time: 0, lyricStr: "纯音乐，请欣赏", cnLyricStr: "", index: 0
            }
            lyricArr.push(obj)
            return lyricArr
        }
        console.log('lyricArr', lyricArr)
        let linesArr = createArr(lines, true)
        let transLinesArr = createArr(transLines, false)
        let obj = linesArr[0]
        lyricArr.push(obj)
        for (let i = 1, j = 0; i < linesArr.length; i++, j++) {
            let obj = Object.assign(linesArr[i], transLinesArr[j])
            lyricArr.push(obj)
        }
        return lyricArr
        function formatLyricTime(time: string) {
            const regMin = /.*:/
            const regSec = /:.*\./
            const regMs = /\./
            const min = parseInt(time.match(regMin)![0].slice(0, 2))
            let sec = parseInt(time.match(regSec)![0].slice(1, 3))
            const ms = time.slice(time.match(regMs)!.index! + 1, time.match(regMs)!.index! + 3)
            if (min !== 0) {
                sec += min * 60
            }
            return Number(sec + '.' + ms)
        }
        function createArr(lines: string[], flag: boolean) {
            let lyricsObjArr: lyricType[] = [];
            if (flag) {
                let index = 0;
                lines.forEach(item => {
                    if (item === "") return
                    const timeRegRes = item.match(regTime)
                    let time = timeRegRes ? formatLyricTime(timeRegRes[0].slice(1, timeRegRes[0].length - 1)) : 0
                    let lyricStr = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
                    if (lyricStr) {
                        let obj = {
                            time, lyricStr, index
                        }
                        lyricsObjArr.push(obj)
                        index++
                    }
                });
            } else {
                let index = 1;
                lines.forEach(item => {
                    if (item === "") return
                    const timeRegRes = item.match(regTime)
                    let time = timeRegRes ? formatLyricTime(timeRegRes[0].slice(1, timeRegRes[0].length - 1)) : 0
                    let transLyricStr = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
                    if (transLyricStr) {
                        let obj = {
                            time, transLyricStr, index
                        }
                        lyricsObjArr.push(obj)
                        index++
                    }
                });
            }
            return [...new Set(lyricsObjArr)]
        }
    }
    //根据id获取歌曲信息
    async function selectMusicById(id: string, index: number) {
        let data = await getSongUrl(id, localStorage.getItem('cookie'))
        let detail = await getSongDetail(id)
        let url = data.data.data[0].url
        let name = detail.data.songs[0].name
        let artist = joinArtistName(detail.data.songs[0].ar)
        let cover = detail.data.songs[0].al.picUrl
        let lyric = await getLyrics(id)
        let curLyricIndex = 0
        let curMusicInfo = {
            name, artist, url, cover, index, lyric, curLyricIndex
        }
        // console.log('curMusicInfo', curMusicInfo)
        mainStore.curMusicInfo = curMusicInfo
    }
    onMounted(async () => {
        //获取登录状态
        let data = await getLoginState()
        if (data.data.data.code !== 200 || !localStorage.getItem('cookie')) {
            let loginRes = await loginByPhone(account, pwd)
            let obj = {
                data: loginRes.data.cookie,
                time: Date.now(),
                storageTime: '30d'
            }
            localStorage.setItem('cookie', JSON.stringify(obj))
        }
        //登录
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
    return { MusicList, nextMusic, playNext, selectMusicById, joinArtistName, playPrev }

}