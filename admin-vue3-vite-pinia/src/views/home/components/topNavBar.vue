<template>
    <div class="top-nav-bar-container">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.top-nav-bar-container {
    position: fixed;
    z-index: 999;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 55px;
    background-color: white;
    box-shadow: $base_shadow;
    .el-breadcrumb {
        margin-left: 30px;
    }
}
</style>