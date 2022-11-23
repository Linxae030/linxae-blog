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
                    <li
                        class="article-container"
                        v-for="(item, key) in articleList"
                        :key="key"
                    >
                        <div
                            class="article-img"
                            :style="`background-image:url(${handleImgPath(
                                item.article_cover
                            )})`"
                        >
                            <div class="wrap"></div>
                        </div>
                        <div class="article-info">
                            <div class="header">
                                <span class="title">{{
                                    item.article_title
                                }}</span>
                                <ul class="tags">
                                    <span
                                        ><img
                                            src="../../assets/iconfont/tags.png"
                                            alt=""
                                            style="width: 25px; height: 25px"
                                    /></span>
                                    <el-tag
                                        v-for="tag in item.tag_list"
                                        :key="tag.id"
                                        class="tag-item"
                                        effect="dark"
                                        round
                                    >
                                        {{ tag.tag_name }}
                                    </el-tag>
                                </ul>
                            </div>
                            <span
                                class="article-part"
                                v-html="item.article_content"
                                v-highlight
                            >
                            </span>
                            <div class="footer">
                                <div class="time">
                                    <img
                                        src="../../assets/iconfont/时间戳.png"
                                        style="width: 25px; height: 25px"
                                        alt=""
                                    />
                                    <span style="margin-left: 5px"
                                        >发布于
                                        {{
                                            item.update_time
                                                ? item.update_time
                                                : item.create_time
                                        }}</span
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
                                        v-if="item.is_top"
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
                                            @click="
                                                $router.push(
                                                    `article?id=${item.id!}`
                                                )
                                            "
                                        >
                                            阅读详细
                                        </el-tag>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="side-bar"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" scoped setup>
import { QqCircleFilled } from "@ant-design/icons-vue";
import musicPlayer from "../../views/home/component/musicPlayer.vue";
import myCard from "../../views/home/component/myCard.vue";
import useArticles from "@/hooks/home/useArticles";
import { handleImgPath } from "@/assets/ts/utils";
// markdown样式
let articles = useArticles();
let { articleList } = articles;
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