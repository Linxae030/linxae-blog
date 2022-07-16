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
                <el-button type="success" @click="dialogFormVisible = true"
                    >发布文章</el-button
                >
                <el-button type="warning">保存草稿</el-button>
            </div>
        </div>
        <v-md-editor height="480px" v-model="markdown"></v-md-editor>
    </div>
    <el-dialog v-model="dialogFormVisible" title="详细信息">
        <el-form :model="formData">
            <el-form-item label="分类" :label-width="formLabelWidth">
                <el-select
                    v-model="formData.cateSelected"
                    placeholder="请选择分类"
                >
                    <el-option
                        v-for="item in formData.cateList"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="标签" :label-width="formLabelWidth">
                <el-select
                    v-model="formData.tagSelected"
                    placeholder="请选择标签"
                    multiple
                >
                    <el-option
                        v-for="item in formData.tagList"
                        :key="item.id"
                        :label="item.tag_name"
                        :value="item.id"
                        label="Zone No.1"
                        value="shanghai"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button
                    @click="
                        handlePost();
                        dialogFormVisible = false;
                    "
                    type="success"
                    >发布！</el-button
                >
                <el-button type="primary" @click="dialogFormVisible = false"
                    >再确认一下罢（悲</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import useArticlesPost from "@/hooks/articles/useArticlesPost";
import subTitle from "@/components/subTitle.vue";
import { ref } from "vue";
let title = "文章发布";
const ArticlesPost = useArticlesPost();
const {
    inputTitle,
    markdown,
    dialogFormVisible,
    formLabelWidth,
    formData,
    handlePost,
} = ArticlesPost;
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