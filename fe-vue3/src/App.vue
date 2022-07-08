<template>
    <!-- 头部导航栏 -->
    <topNavBar />
    <!-- 内容 -->
    <router-view></router-view>
    <bottomFooterBar v-if="$store.state.isShowFooter" />
</template>

<script lang="ts">
import { ref, customRef, defineAsyncComponent } from "vue";
import topNavBar from "./components/layout/topNavBar.vue";
import bottomFooterBar from "./components/layout/bottomFooterBar.vue";
import home from "./views/home/home.vue";
export default {
    components: { home, topNavBar, bottomFooterBar },
    name: "App",
    setup() {},
};
</script>

<style lang="scss">
body {
    background: {
        image: url("./assets/img/home/bg.png");
        repeat: no-repeat;
        size: cover;
        attachment: fixed;
    }
}
body::-webkit-scrollbar {
    display: none;
}
</style>

