<template>
    <div class="container">
        <aside class="side-nav-bar">
            <sideNavBar />
        </aside>
        <div class="main-content-container">
            <header class="top-nav-bar"><topNavBar /></header>
            <section class="router-view">
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import sideNavBar from "./components/sideNavBar.vue";
import topNavBar from "./components/topNavBar.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home/home.scss";
</style>