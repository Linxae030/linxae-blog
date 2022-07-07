<template>
    <div class="outer-container">
        <section class="screen bg-container" v-if="showScene">
            <div id="scene">
                <div data-depth="0" class="bg">
                    <img src="../../assets/img/home/background.png" alt="" />
                </div>
                <div data-depth="0.2" class="rock1">
                    <img src="../../assets/img/home/rock.png" alt="" />
                </div>
                <div data-depth="0.8" class="earth">
                    <img src="../../assets/img/home/earth.png" alt="" />
                </div>
                <div data-depth="0.1" class="text">
                    <h1>Linxae</h1>
                    <div class="vuetyped">
                        <vuetyped
                            :strings="[typeMessageList]"
                            :loop="false"
                            :cursorChar="'。'"
                        >
                            <div class="typing" />
                        </vuetyped>
                    </div>
                </div>
                <div data-depth="0.4" class="mid">
                    <img src="../../assets/img/home/mid.png" alt="" />
                </div>
                <div data-depth="0.1" class="fore">
                    <img src="../../assets/img/home/foreground.png" alt="" />
                </div>
                <!-- 向下滚动 -->
                <div data-depth="0" class="scroll-down" @click="handleClick">
                    <down-circle-outlined
                        style="font-size: 30px; color: #fff; cursor: pointer"
                    />
                </div>
            </div>
        </section>
    </div>
    <down-main v-if="showDownMain" />
</template>
<script lang="ts">
import { DownCircleOutlined } from "@ant-design/icons-vue";
import useType from "../../hooks/home/useType";
import useDown from "../../hooks/home/useDown";
import useParallax from "../../hooks/home/useParallax";
import DownMain from "./downMain.vue";
export default {
    name: "home",
    components: { DownMain, DownCircleOutlined },
    setup() {
        //视差动画
        let parallax = useParallax();
        //轮播文字
        let typeMessageList = useType();
        //处理下滑至down-main区域
        let useDownObj = useDown();
        return { typeMessageList, ...useDownObj };
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/home/home.scss";
</style>