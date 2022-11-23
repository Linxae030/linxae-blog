<template>
    <div class="articles-post-container">
        <subTitle :title="title" />
        <div class="table">
            <el-table
                :data="
                    cateList.filter(
                        (data) =>
                            !search ||
                            // @ts-ignore
                            data.id
                                .toString()
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            // @ts-ignore
                            data.tag_name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                    )
                "
                style="width: 100%"
                :stripe="true"
                max-height="550"
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
            >
                <el-table-column label="分类序号" prop="id" />
                <el-table-column label="分类名称" prop="tag_name" sortable>
                    <template #default="scope">
                        <el-tag>{{ scope.row.category_name }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="create_time" />
                <el-table-column>
                    <template #header>
                        <div class="header-container">
                            <el-popover
                                v-model:visible="visible"
                                placement="top"
                                :width="160"
                            >
                                <div
                                    class="tag-title"
                                    style="
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        margin-bottom: 5px;
                                    "
                                >
                                    <div>分类</div>
                                    <div class="button-set">
                                        <el-button
                                            size="small"
                                            type="primary"
                                            @click="
                                                handleAdd();
                                                visible = false;
                                            "
                                            >保存</el-button
                                        >
                                        <el-button
                                            size="small"
                                            @click="visible = false"
                                            >取消</el-button
                                        >
                                    </div>
                                </div>
                                <el-input
                                    v-model="cateName"
                                    placeholder="请输入分类名"
                                />
                                <template #reference>
                                    <el-button
                                        type="success"
                                        @click="visible = true"
                                        style="margin-right: 15px"
                                        >添加分类</el-button
                                    >
                                </template>
                            </el-popover>
                            <el-input
                                v-model="search"
                                size="small"
                                placeholder="Type to search"
                            />
                        </div>
                    </template>
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button
                        >
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
import subTitle from "@/components/subTitle.vue";
import useCategoryManage from "@/hooks/articles/useCategoryManage";
let cateManage = useCategoryManage();
let {
    search,
    cateList,
    visible,
    cateName,
    handleDelete,
    handleAdd,
    handleEdit,
} = cateManage;
let title = "分类管理";
</script>

<style lang="scss" scoped>
.articles-post-container {
    width: 100%;
    padding: 20px;
    min-height: 620px;
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
    .header-container {
        display: flex;
        .button {
            margin-right: 15px;
        }
        .tag-title {
            display: flex;
            .button-set {
            }
        }
    }
}
</style>