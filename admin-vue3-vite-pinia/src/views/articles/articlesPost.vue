<template>
    <div class="articles-post-container">
        <subTitle :title="title" />
        <div class="save-title-input">
            <div class="input">
                <el-input
                    v-model="inputTitle"
                    placeholder="请输入文章标题"
                    clearable
                />
            </div>
            <div class="button-set">
                <el-button type="success" @click="handlePost"
                    >发布文章</el-button
                >
                <el-button type="warning">保存草稿</el-button>
            </div>
        </div>
        <v-md-editor height="480px" v-model="markdown"></v-md-editor>
    </div>
</template>

<script lang="ts" setup>
import useArticlesPost from "@/hooks/articles/useArticlesPost";
import subTitle from "@/components/subTitle.vue";
import { toRefs } from "vue";
let title = "文章发布";
const ArticlesPost = useArticlesPost();
const { inputTitle, markdown, handlePost } = toRefs(ArticlesPost);
</script>

<style lang="scss" scoped>
.articles-post-container {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    .save-title-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 60px;
        .input {
            width: 83%;
        }
        .button-set {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>