<template>
    <div class="wrap">
        <div class="down-main">
            <div class="my-card w">
                <div class="card-container">
                    <div class="card-personal">
                        <h1>Linxaeの妙妙屋</h1>
                        <div class="card-avatar">
                            <img
                                src="../../assets/img/home/avatar.jpg"
                                alt=""
                            />
                        </div>
                        <ul class="card-statistics">
                            <li class="articles-num">
                                <span class="num">114</span>
                                <span class="tag">文章</span>
                            </li>
                            <li class="pic-num">
                                <span class="num">114</span>
                                <span class="tag">图片</span>
                            </li>
                            <li class="note-num">
                                <span class="num">114</span>
                                <span class="tag">笔记</span>
                            </li>
                        </ul>
                        <div class="card-social-links">
                            <li
                                class="iconfont icon-QQ"
                                style="color: rgb(66, 170, 237)"
                            ></li>
                            <li
                                class="iconfont icon-weixin1"
                                style="color: rgb(63, 168, 0)"
                            ></li>
                            <li>
                                <img
                                    src="../../assets/iconfont/网易云音乐.png"
                                    alt=""
                                    style="width: 40px; height: 40px"
                                />
                            </li>
                            <li
                                class="iconfont icon-bilibili"
                                style="color: rgb(66, 170, 237)"
                            ></li>
                            <li
                                class="iconfont icon-github"
                                style="color: black"
                            ></li>
                            <li>
                                <img
                                    src="../../assets/iconfont/steam.png"
                                    alt=""
                                    style="width: 32px; height: 32px"
                                />
                            </li>
                        </div>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="card-friends-notice">
                        <div class="friend-links-title">
                            <img src="../../assets/iconfont/链接.png" alt="" />
                            <span class="links-title-content">友链</span>
                        </div>
                        <div class="card-friend-links">
                            <ul class="friend-list">
                                <li class="friend-item">
                                    <img
                                        class="avatar"
                                        src="../../assets/iconfont/hch.png"
                                        alt=""
                                    />
                                    <h1 class="id">hch</h1>
                                </li>
                                <li class="friend-item">
                                    <img
                                        class="avatar"
                                        src="../../assets/iconfont/hch.png"
                                        alt=""
                                    />
                                    <h1 class="id">hch</h1>
                                </li>
                                <li class="friend-item">
                                    <img
                                        class="avatar"
                                        src="../../assets/img/home/avatar.jpg"
                                        alt=""
                                    />
                                    <h1 class="id">Linxae</h1>
                                </li>
                                <li class="friend-item">
                                    <img
                                        class="avatar"
                                        src="../../assets/img/home/avatar.jpg"
                                        alt=""
                                    />
                                    <h1 class="id">Linxae</h1>
                                </li>
                                <li class="friend-item">
                                    <img
                                        class="avatar"
                                        src="../../assets/img/home/avatar.jpg"
                                        alt=""
                                    />
                                    <h1 class="id">Linxae</h1>
                                </li>
                                <li class="friend-item">
                                    <img
                                        class="avatar"
                                        src="../../assets/img/home/avatar.jpg"
                                        alt=""
                                    />
                                    <h1 class="id">Linxae</h1>
                                </li>
                            </ul>
                        </div>
                        <div class="card-notice">
                            <div class="card-notice-title">
                                <img
                                    src="../../assets/iconfont/喇叭.png"
                                    alt=""
                                />
                                <span class="title-content"
                                    >伟大的Linxae如是说道...</span
                                >
                            </div>
                            <div class="card-notice-content">
                                <span class="notice-content"
                                    >伟大的Linxae如是说道...</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="music-player">音乐播放器</div>
            </div>
            <div class="art-side-bar w">
                <ul class="articles-area">
                    <li class="article-container">
                        <div class="article-info">
                            <div class="time">
                                <el-icon :size="size" :color="color">
                                    <Edit /> </el-icon
                                >发布于
                                <span>2022-01-03</span>
                            </div>
                            <div class="title">
                                <span>2021年度总结</span>
                            </div>
                            <div class="extend-info">
                                <div class="flow"><span>1550热度</span></div>
                                <h4 class="comment"><span>2条评论</span></h4>
                            </div>
                            <span class="article-part"
                                >iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具</span
                            >
                        </div>
                        <div class="article-img"></div>
                    </li>
                    <li></li>
                    <li></li>
                </ul>
                <div class="side-bar"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" scoped>
import { QqCircleFilled } from "@ant-design/icons-vue";
export default {
    components: { QqCircleFilled },
};
</script>

<style lang="scss" scoped>
// 引入全局变量及mixin
@import "../../assets/scss/global.scss";
@import "../../assets/scss/home/down-mycard.scss";
@import "../../assets/scss/home/down-articles.scss";
.down-main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 2000px;
    margin-top: 20px;
}
.el-divider--vertical {
    background-color: black;
    height: 26em;
}
</style>