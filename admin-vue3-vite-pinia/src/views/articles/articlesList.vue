<template>
    <div class="articles-List-container">
        <subTitle :title="title" />
        <div class="table">
            <el-table
                :data="
                    tableData.filter(
                        (data) =>
                            !search ||
                            // @ts-ignore
                            data.article_title
                                .toLowerCase()
                                .includes(search.toLowerCase())
                    )
                "
                style="width: 100%"
                :stripe="true"
                max-height="550"
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
                :expand-row-keys="expand"
                row-key="index"
                @expand-change="clickRowHandle"
                lazy
            >
                >
                <el-table-column type="expand">
                    <template #default="props">
                        <div class="container">
                            <div class="save-title-input">
                                <div class="input">
                                    <el-input
                                        v-model="inputTitle"
                                        placeholder="请输入文章标题"
                                        clearable
                                    />
                                </div>
                            </div>
                            <div class="mark">
                                <v-md-editor
                                    height="480px"
                                    v-model="markdown"
                                ></v-md-editor>
                            </div>
                            <el-form :model="formData" style="padding: 30px">
                                <el-form-item
                                    label="分类"
                                    :label-width="formLabelWidth"
                                >
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
                                <el-form-item
                                    label="标签"
                                    :label-width="formLabelWidth"
                                >
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
                                <el-form-item
                                    label="置顶"
                                    :label-width="formLabelWidth"
                                >
                                    <el-radio-group v-model="formData.isTop">
                                        <el-radio-button label="1" border
                                            >是</el-radio-button
                                        >
                                        <el-radio-button label="0" border
                                            >否</el-radio-button
                                        >
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item
                                    label="文章类型"
                                    :label-width="formLabelWidth"
                                >
                                    <el-radio-group v-model="formData.type">
                                        <el-radio-button label="1" border
                                            >原创</el-radio-button
                                        >
                                        <el-radio-button label="2" border
                                            >转载</el-radio-button
                                        >
                                        <el-radio-button label="3" border
                                            >翻译</el-radio-button
                                        >
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item
                                    label="文章封面"
                                    :label-width="formLabelWidth"
                                >
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
                                        :on-change="onChange"
                                    >
                                        <el-icon><Plus /></el-icon>
                                        <template #file="{ file }">
                                            <div>
                                                <img
                                                    class="el-upload-list__item-thumbnail"
                                                    :src="file.url"
                                                    alt=""
                                                />
                                                <span
                                                    class="el-upload-list__item-actions"
                                                >
                                                    <span
                                                        class="el-upload-list__item-preview"
                                                        @click="
                                                            handlePictureCardPreview(
                                                                file
                                                            )
                                                        "
                                                    >
                                                        <el-icon
                                                            ><zoom-in
                                                        /></el-icon>
                                                    </span>
                                                    <span
                                                        v-if="!disabled"
                                                        class="el-upload-list__item-delete"
                                                        @click="
                                                            handleRemove(file)
                                                        "
                                                    >
                                                        <el-icon
                                                            ><Delete
                                                        /></el-icon>
                                                    </span>
                                                </span>
                                            </div>
                                        </template>
                                        <div class="el-upload__text">
                                            <em>点击或拖拽上传</em>
                                        </div>
                                        <el-dialog v-model="dialogVisible">
                                            <img
                                                w-full
                                                :src="dialogImageUrl"
                                                alt="预览图片"
                                            />
                                        </el-dialog>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item
                                    label="现封面"
                                    :label-width="formLabelWidth"
                                >
                                    <div>
                                        <el-image
                                            style="width: 150px; height: 150px"
                                            :src="handleImgPath(formData.coverUrl)"
                                            fit="scale-down"
                                        />
                                    </div>
                                </el-form-item>
                            </el-form>
                            <span class="dialog-footer">
                                <el-button
                                    @click="submitUpload()"
                                    type="success"
                                    >保存修改！</el-button
                                >
                                <el-button type="primary"
                                    >再确认一下罢（悲</el-button
                                >
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="文章标题" prop="article_title" />
                <el-table-column label="发布时间" prop="create_time" sortable />
                <el-table-column label="所属分类" prop="category_id" />
                <el-table-column label="文章类型" prop="type" />
                <el-table-column label="是否置顶" prop="is_top" sortable>
                    <template #default="scope">
                        <el-tag
                            :type="
                                scope.row.is_top == '置顶'
                                    ? 'danger'
                                    : 'success'
                            "
                            >{{ scope.row.is_top }}</el-tag
                        >
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #header>
                        <el-input
                            v-model="search"
                            size="small"
                            placeholder="Type to search"
                        />
                    </template>
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useArticlesList from "@/hooks/articles/useArticlesList";
import useArticlesPost from "@/hooks/articles/useArticlesPost";
import useFiles from "@/hooks/files/useFiles";
import subTitle from "@/components/subTitle.vue";
import { ref } from "vue";
import { UploadInstance } from "element-plus";
import { handleImgPath } from "@/assets/ts/utils";
let title = "文章列表";
//文件上传元素引用
const uploadRef = ref<UploadInstance>();
const submitUpload = () => {
    //调用文章处理钩子方法进行处理
    handleUpdate(uploadRef);
};
const ArticlesList = useArticlesList();
const ArticlesPost = useArticlesPost();
const Files = useFiles();
const {
    tableData,
    search,
    expand,
    inputTitle,
    markdown,
    formData,
    formLabelWidth,
    handleUpdate,
    handleUpSuccess,
    clickRowHandle,
    handleDelete,
    onChange
} = ArticlesList;
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
.articles-List-container {
    max-width: 100%;
    padding: 20px;
    box-sizing: border-box;
    min-height: 620px;
    // max-width: 1270px;
    background-color: white;
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        .mark {
            width: 100%;
        }
        .save-title-input {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90%;
            height: 60px;

            .input {
                width: 100%;
            }
        }
    }
}
</style>