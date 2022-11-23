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
                <el-button type="warning" @click="postDraft"
                    >保存草稿</el-button
                >
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
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="置顶" :label-width="formLabelWidth">
                <el-radio-group v-model="formData.isTop">
                    <el-radio-button label="1" border>是</el-radio-button>
                    <el-radio-button label="0" border>否</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文章类型" :label-width="formLabelWidth">
                <el-radio-group v-model="formData.type">
                    <el-radio label="1">原创</el-radio>
                    <el-radio label="2">转载</el-radio>
                    <el-radio label="3">翻译</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文章封面" :label-width="formLabelWidth">
                <el-upload
                    class="upload-demo"
                    drag
                    action="http://127.0.0.1:3008/files/uploadImg"
                    :headers="fileHeader"
                    :limit="1"
                    :auto-upload="false"
                    list-type="picture-card"
                    :file-list="fileList"
                    ref="uploadRef"
                    :on-success="handleUpSuccess"
                >
                    <el-icon><Plus /></el-icon>
                    <template #file="{ file }">
                        <div>
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url"
                                alt=""
                            />
                            <span class="el-upload-list__item-actions">
                                <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                                >
                                    <el-icon><zoom-in /></el-icon>
                                </span>
                                <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                                >
                                    <el-icon><Delete /></el-icon>
                                </span>
                            </span>
                        </div>
                    </template>
                    <div class="el-upload__text">
                        <em>点击或拖拽上传</em>
                    </div>
                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="预览图片" />
                    </el-dialog>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button
                    @click="
                        submitUpload();
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
import useFiles from "@/hooks/files/useFiles";
import subTitle from "@/components/subTitle.vue";
import { UploadInstance } from "element-plus";
import { ref } from "vue";
//文件上传元素引用
const uploadRef = ref<UploadInstance>();
let title = "文章发布";
const submitUpload = () => {
    //调用文章处理钩子方法进行处理
    handlePost(uploadRef);
};
const ArticlesPost = useArticlesPost();
const {
    inputTitle,
    markdown,
    formLabelWidth,
    formData,
    dialogFormVisible,
    handlePost,
    handleUpSuccess,
    postDraft,
} = ArticlesPost;
const Files = useFiles();
const {
    dialogImageUrl,
    dialogVisible,
    disabled,
    fileHeader,
    fileList,
    handlePictureCardPreview,
    handleRemove,
} = Files;
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