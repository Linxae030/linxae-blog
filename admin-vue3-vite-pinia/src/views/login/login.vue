<template>
    <div class="bg-container">
        <div class="login-area">
            <div class="title">
                <h1>管理员登录</h1>
            </div>
            <div class="input-area">
                <el-form
                    ref="ruleFormRef"
                    :model="formData"
                    :rules="rules"
                    label-width="50px"
                    class="demo-ruleForm"
                    status-icon
                >
                    <el-form-item label="账号" prop="account" class="input">
                        <template #label>
                            <el-icon
                                style="
                                    cursor: pointer;
                                    font-size: 22px;
                                    margin-top: 5px;
                                "
                                ><Avatar
                            /></el-icon>
                        </template>
                        <el-input
                            placeholder="请输入账号"
                            size="large"
                            v-model="formData.account"
                        />
                    </el-form-item>
                    <el-form-item
                        label="密码"
                        prop="password"
                        class="input"
                        size="large"
                    >
                        <template #label>
                            <el-icon
                                style="
                                    cursor: pointer;
                                    font-size: 22px;
                                    margin-top: 8px;
                                "
                                ><Lock
                            /></el-icon>
                        </template>
                        <el-input
                            placeholder="请输入密码"
                            show-password
                            v-model="formData.password"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
                >登录</el-button
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import useLogin from "@/hooks/login/useLogin";
const login = useLogin();
let { rules, formData, ruleFormRef, handleLogin, submitForm } = login;
</script>

<style lang="scss" scoped>
.bg-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    background: {
        image: url("../../assets/img/login/bg.png");
        repeat: no-repeat;
        size: cover;
        attachment: fixed;
    }
    .login-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 100%;
        background-color: rgba($color: #fff, $alpha: 0.4);
        //毛玻璃遮罩层
        backdrop-filter: blur(5px);
        color: black;
        .el-form {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
        .el-form-item {
            display: flex;
            align-items: center;
            width: 380px;
            margin: 8px;
        }
        .title {
            font-size: 10px;
            // justify-self: flex-start;
        }
    }
}
</style>