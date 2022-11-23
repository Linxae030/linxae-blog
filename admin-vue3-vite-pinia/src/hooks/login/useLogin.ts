import { ElMessage, FormInstance, FormRules, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import { login, logout } from '@/api/login/login&registerApi'
import router from "@/router";
export default function () {
    const rules = reactive<FormRules>({
        account: [
            {
                required: true,
                message: "账号不可为空!",
                trigger: "blur",
            },
        ],
        password: [
            {
                required: true,
                message: "密码不可为空!",
                trigger: "blur",
            },
        ],
    });
    const formData = reactive({
        account: "",
        password: ""
    });
    const ruleFormRef = ref<FormInstance>()
    async function handleLogin() {
        let data = await login(formData.account, formData.password)
        if (data.status) {
            ElMessage({
                // @ts-ignore
                message: data.message,
                type: 'error',
            })
        } else {
            // @ts-ignore
            localStorage.setItem('token', data.token)
            // @ts-ignore
            localStorage.setItem('username', data.username)
            // @ts-ignore
            localStorage.setItem('id', data.id)
            ElMessage({
                // @ts-ignore
                message: data.message,
                type: 'success',
            })
            setTimeout(() => {
                router.push('/')
            }, 1000);

        }

    }
    async function handleLogout() {
        ElMessageBox.confirm(
            '是否退出？',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
            .then(async () => {
                let data = await logout(localStorage.getItem('username')!);
                if (data.status === 0) {
                    localStorage.clear()
                    ElMessage({
                        type: 'success',
                        message: '已退出登录',
                    })
                    setTimeout(() => {
                        router.go(0)
                    }, 1000);
                } else {
                    ElMessage({
                        type: 'error',
                        message: '退出登录失败',
                    })
                }


            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消',
                })
            })

    }
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                handleLogin()
            } else {
                let fe = fields
                if (fe) {
                    ElMessage({
                        message: fe.account[0].message,
                        type: 'error',
                    })
                    ElMessage({
                        message: fe.password[0].message,
                        type: 'error',
                    })
                }


            }
        })
    }
    return { rules, formData, ruleFormRef, handleLogin, handleLogout, submitForm }
}