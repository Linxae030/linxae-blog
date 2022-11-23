<template>
    <div class="top-nav-bar-container">
        <div class="breadcrumb">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item
                    v-for="item in list"
                    :to="{ path: item.path }"
                    :key="item.path"
                    ><span>{{ item.meta.title }}</span></el-breadcrumb-item
                >
            </el-breadcrumb>
        </div>
        <div class="logout">
            <el-button type="primary" @click="handleLogout()">登出</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { toRefs } from "vue";
import useLogin from "@/hooks/login/useLogin";
import useTopNavBar from "@/hooks/home/useTopNavBar";
const login = useLogin();
const topNavBar = useTopNavBar();
let { list } = topNavBar;
let { handleLogout } = login;
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.top-nav-bar-container {
    position: fixed;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 210px);
    height: 55px;
    background-color: white;
    box-shadow: $base_shadow;
    .el-breadcrumb {
        margin-left: 30px;
    }
    .logout {
        margin-right: 30px;
    }
}
</style>