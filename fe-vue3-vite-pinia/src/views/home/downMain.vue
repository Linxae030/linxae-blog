<template>
    <div class="wrap">
        <div class="down-main">
            <div class="my-card w">
                <!-- 个人信息公告栏 -->
                <myCard />
                <!--  -->
                <musicPlayer />
            </div>
            <div class="art-side-bar w">
                <ul class="articles-area">
                    <li class="article-container">
                        <div class="article-img"><div class="wrap"></div></div>
                        <div class="article-info">
                            <div class="header">
                                <span class="title">2021年度总结</span>
                                <ul class="tags">
                                    <span
                                        ><img
                                            src="../../assets/iconfont/tags.png"
                                            alt=""
                                            style="width: 25px; height: 25px"
                                    /></span>
                                    <!-- <el-tag
                                        v-for="item in items"
                                        :key="item.label"
                                        :type="item.type"
                                        class="mx-1"
                                        effect="dark"
                                        round
                                    >
                                        {{ item.label }}
                                    </el-tag> -->
                                    <el-tag class="tag-item" round>
                                        前端 </el-tag
                                    ><el-tag class="tag-item" round>
                                        前端 </el-tag
                                    ><el-tag class="tag-item" round>
                                        前端 </el-tag
                                    ><el-tag class="tag-item" round>
                                        前端 </el-tag
                                    ><el-tag class="tag-item" round>
                                        前端
                                    </el-tag>
                                </ul>
                            </div>
                            <span class="article-part">
                                iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具</span
                            >
                            <div class="footer">
                                <div class="time">
                                    <img
                                        src="../../assets/iconfont/时间戳.png"
                                        style="width: 25px; height: 25px"
                                        alt=""
                                    />
                                    <span style="margin-left: 5px"
                                        >发布于 2022-01-03</span
                                    >
                                </div>
                                <div class="fixed-top">
                                    <el-tag
                                        effect="dark"
                                        type="danger"
                                        class="tag-top"
                                        round
                                        size="large"
                                        v-show="true"
                                    >
                                        置顶!
                                    </el-tag>
                                </div>
                                <div class="extend-info">
                                    <div class="comment">
                                        <img
                                            src="../../assets/iconfont/消息.png"
                                            style="width: 25px; height: 25px"
                                            alt=""
                                        /><span style="margin-left: 5px"
                                            >2 条评论</span
                                        >
                                    </div>
                                    <div class="go-detail">
                                        <el-tag
                                            effect="dark"
                                            type="success"
                                            class="tag-top"
                                            round
                                            size="large"
                                            v-show="true"
                                        >
                                            阅读详细
                                        </el-tag>
                                    </div>
                                </div>
                            </div>
                        </div>
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
import musicPlayer from "../../views/home/component/musicPlayer.vue";
import myCard from "../../views/home/component/myCard.vue";
export default {
    components: { QqCircleFilled, musicPlayer, myCard },
    setup() {},
};
</script>

<style lang="scss" scoped>
// 引入全局变量及mixin
@import "../../assets/scss/global.scss";
@import "../../assets/scss/home/down-articles.scss";
.down-main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 2000px;
    margin-top: 20px;
}
.my-card {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-top: 50px;
}
.el-divider--vertical {
    background-color: black;
    height: 26em;
}
</style>