<template>
    <div class="side-nav-bar-container">
        <el-row class="tac">
            <el-col :span="12">
                <el-menu
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    class="el-menu-vertical"
                    :default-active="curActive"
                    :default-openeds="[curActive]"
                    :unique-opened="true"
                    text-color="#fff"
                    @open="handleOpen"
                    @close="handleClose"
                    router
                >
                    <MenuList :itemList="itemList" />
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import useSideNavBar from "@/hooks/home/useSideNavBar";
import MenuList from "./menuList.vue";
import { toRef } from "vue";
import router from "../../../router/index";
let sideNavBar = useSideNavBar();
let { itemList, curActive } = sideNavBar;
function handleOpen() {
    console.log("curActive", curActive);
}
function handleClose() {}
</script>

<style lang='scss' scoped>
.side-nav-bar-container {
    position: fixed;
    .el-menu-vertical {
        width: 210px;
        height: 100vh;
    }
}
</style>