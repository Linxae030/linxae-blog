<template>
    <div class="subtitle-container">
        <div class="deco"></div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
});
const { title } = toRefs(props);
</script>

<style lang="scss" scoped>
.subtitle-container {
    display: flex;
    align-items: center;
    width: 100px;
    height: 40px;
    font-size: 16px;
    color: black;
    font-weight: 700;
    // background-color: red;
    .deco {
        position: relative;
        right: 20px;
        height: 50%;
        width: 4px;
        background-color: rgb(0, 129, 255);
    }
}
</style>