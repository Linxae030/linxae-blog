<template>
    <div class="down-main">
        <div class="row-1 w">
            <div class="card-container">
                <div class="card-content">
                    <a href="#">Linxaeの妙妙屋</a>
                    <h2>QQ:702611663</h2>
                    <span
                        >音游玩家<br />
                        maimai绝赞爆g中<br />
                        爱玩的游戏有很多<br />
                        也许是个脾气很好的人<br />
                        学前端是兴趣</span
                    >
                </div>
                <div class="card-pic">
                    <img src="../../assets/img/home/迪拉龙.webp" alt="" />
                </div>
                <ul class="card-extend-pic"></ul>
            </div>
            <div class="links">
                <div class="social-links">
                    <li
                        class="iconfont icon-QQ"
                        style="
                            font-size: 44px;
                            color: rgb(66, 170, 237);
                            background-color: rgb(158, 212, 220);
                        "
                    ></li>
                    <li
                        class="iconfont icon-weixin1"
                        style="
                            font-size: 44px;
                            color: rgb(63, 168, 0);
                            background-color: rgb(197, 226, 230);
                        "
                    ></li>
                    <li
                        class="iconfont icon-wangyiyunyinle"
                        style="
                            font-size: 44px;
                            color: red;
                            background-color: rgb(248, 228, 219);
                        "
                    ></li>
                    <li
                        class="iconfont icon-bilibili"
                        style="
                            font-size: 38px;
                            color: rgb(66, 170, 237);
                            background-color: rgb(190, 196, 216);
                        "
                    ></li>
                    <li
                        class="iconfont icon-github"
                        style="
                            font-size: 40px;
                            color: black;
                            background-color: rgb(221, 237, 238);
                        "
                    ></li>
                    <li
                        class="iconfont icon-github"
                        style="
                            font-size: 40px;
                            color: black;
                            background-color: rgb(221, 237, 238);
                        "
                    ></li>
                </div>
                <div class="friend-links">友链</div>
            </div>
        </div>
        <div class="row-2 w">
            <div class="recent-articles">最近文章</div>
            <div class="side-nav-bar"></div>
        </div>
    </div>
    <bottomFooterBar />
</template>

<script lang="ts" scoped>
import { QqCircleFilled, StarFilled, StarTwoTone } from "@ant-design/icons-vue";
import bottomFooterBar from "../../components/layout/bottomFooterBar.vue";
export default {
    components: { QqCircleFilled, bottomFooterBar },
};
</script>

<style lang="scss" scoped>
// 引入全局变量及mixin
@import "../../assets/scss/global.scss";
@import "../../assets/scss/home/down-row-1.scss";
@import "../../assets/scss/home/down-row-2.scss";
.down-main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    background: {
        image: url("../../assets/img/home/background.png");
        repeat: no-repeat;
        size: cover;
        attachment: fixed;
    }
}
</style>