<template>
    <topNavBar />
    <home />
    <!-- <bottomFooterBar /> -->
</template>

<script lang="ts">
import { ref, customRef, defineAsyncComponent } from "vue";
import topNavBar from "./components/layout/topNavBar.vue";
// import bottomFooterBar from "./components/layout/bottomFooterBar.vue";
import home from "./views/home/home.vue";
export default {
    components: { home, topNavBar },
    name: "App",
    setup() {},
};
</script>

<style lang="scss">
</style>

