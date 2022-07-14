<template>
    <div>
        <template v-for="item in itemList">
            <el-sub-menu
                v-if="item.children && item.children.length > 0"
                :index="item.path"
            >
                <template #title>
                    <el-icon><component :is="item.icon" /></el-icon>
                    <span>{{ item.title }}</span></template
                >
                <menuList :itemList="item.children" />
            </el-sub-menu>
            <el-menu-item v-else :index="item.path">
                <template #title>
                    <el-icon><component :is="item.icon" /></el-icon>
                    <span>{{ item.title }}</span></template
                >
            </el-menu-item>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { sideNavBarItem } from "@/assets/ts/myInterface";
import { toRefs } from "vue";
name: "menuList";
const prop = defineProps({
    itemList: {
        type: Array<sideNavBarItem>,
    },
});
const { itemList } = toRefs(prop);
</script>

<style>
</style>