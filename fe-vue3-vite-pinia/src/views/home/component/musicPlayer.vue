<template>
    <div class="music-player">
        <div class="music-info">
            <!-- 专辑封面 -->
            <div class="album-cover">
                <img :src="curMusicInfo.cover" :class="isActive" alt="" />
            </div>
            <div class="album-info">
                <audio
                    id="audioTag"
                    :src="curMusicInfo.url"
                    controls
                    @canplay="getDuration"
                    @timeupdate="updateTime"
                    @loadeddata="onLoadedmetadata"
                    @play="isActive = 'active'"
                    @pause="isActive = 'active pause'"
                    @ended="nextMusic"
                ></audio>
                <div class="title">{{ curMusicInfo.name }}</div>
                <div class="artist">{{ curMusicInfo.artist }}</div>
                <div class="track-time">
                    <div class="current-time">
                        {{ realFormatSecond(audio.currentDuration) }}
                    </div>
                    <div class="total-time">
                        {{ realFormatSecond(audio.Duration) }}
                    </div>
                </div>
                <div
                    class="progress"
                    id="progress"
                    @click="clickProgress"
                    @mouseup="handleMouseup"
                >
                    <div class="currentProgress" id="currentProgress">
                        <span
                            class="circle"
                            id="circle"
                            @mousedown="handleMousedown"
                        ></span>
                    </div>
                </div>
                <div class="play-controls">
                    <div class="button play-prev" @click="playPrev()">
                        <img src="@/assets/iconfont/YDUI-上一曲.png" alt="" />
                    </div>
                    <div
                        class="button play-pause"
                        v-if="audio.playing"
                        @click="changePause(true)"
                    >
                        <img src="@/assets/iconfont/暂停.png" alt="" />
                    </div>
                    <div
                        class="button play-continue"
                        v-if="!audio.playing"
                        @click="changePause(false)"
                    >
                        <img
                            src="@/assets/iconfont/播放.png"
                            alt=""
                            style="width: 35px; height: 35px"
                        />
                    </div>
                    <div class="button play-next" @click="playNext(true)">
                        <img src="@/assets/iconfont/YDUI-下一曲.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="lyrics-container">
            <ul class="music-lyrics" :style="lyricTranslateYStr">
                <li
                    :class="
                        item.index === curMusicInfo.curLyricIndex
                            ? 'line curLine'
                            : 'line'
                    "
                    v-for="item in curMusicInfo.lyric"
                    :key="item.index"
                >
                    <div class="lyricStr">{{ item.lyricStr }}</div>
                    <div class="transLyricStr">{{ item.transLyricStr }}</div>
                </li>
            </ul>
        </div>

        <ul class="music-list">
            <li
                class="music-item"
                v-for="(item, index) in MusicList"
                @click="selectMusicById(item.id, item.index)"
            >
                <div class="part-1">
                    <div class="block"></div>
                    <div class="index">{{ index + 1 }}</div>
                    <div class="title">
                        {{ item.name }}
                    </div>
                </div>
                <div class="artist">
                    {{ joinArtistName(item.ar) }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import useMusicPlayer from "@/hooks/home/useMusicPlayer";
import useMusicController from "@/hooks/home/useMusicController";
import { useMainStore } from "@/store";
import { storeToRefs } from "pinia";
export default {
    setup() {
        const mainStore = useMainStore();
        let MusicPlayerInfo = useMusicPlayer();
        let musicController = useMusicController();
        return {
            ...storeToRefs(mainStore),
            ...MusicPlayerInfo,
            ...musicController,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home/down-musicPlayer.scss";
/* 定义动画 */
@keyframes rotateAlbumCover {
    0% {
        transform: rotateZ(0);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
</style>