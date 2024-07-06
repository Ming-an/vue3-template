<!-- login -->
<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12"></el-col>
            <el-col :span="12">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" @click="login" class="login_button" type="primary"
                            size="default">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time'
let useStore = useUserStore()
let loading = ref(false)
let loginForm = reactive({
    username: 'admin',
    password: '111111'
})
let $router = useRouter()
let $route = useRoute()

//获取loginForm组件
let loginForms = ref();
//登录按钮的回调
const login = async () => {
    //全部表单项验证成功在去发请求
    await loginForms.value.validate()
    loading.value = true
    try {
        //通知
        await useStore.userLogin(loginForm);
        // console.log(result)
        let redirect:any = $route.query.redirect;
        $router.push({path:redirect||'/'})
        //登录成功的信息
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `HI ${getTime()}好`
        });
        loading.value = false
    } catch (error) {

        ElNotification({
            type: 'error',
            message: (error as Error).message
        });
        loading.value = false
    }
}
const validatorUserName = (rule: any, value: any, callback: any) => {
    // rule 校验规则对象
    //value 表单元素文本内容
    // callback 
    if (/^\d{1,10}$/.test(value.length)) {
        callback()
    } else {
        callback(new Error('账号长度至少为1位'))
    }

}
//表单校验
const rules = reactive({
    username: [
        // {
        //     required: true,
        //     message: '请输入用户名',
        //     trigger: 'blur'
        // },
        // {
        //     required: true,
        //     min: 2,
        //     max: 6,
        //     message: '账号长度至少为2位',
        //     trigger:'change'
        // }
        {
            trigger: 'change',
            validator: validatorUserName
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        },
        {
            required: true,
            min: 6,
            max: 15,
            message: '密码至少6位',
            trigger: 'change'
        }
    ]
})
</script>

<style lang="scss" scoped>
.login_container {
    width: 100vm;
    height: 100vh;
    // background-color: skyblue
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        padding: 40px;
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;

        h1 {
            font-size: 40px;
            color: white;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }

        .login_button {
            width: 100%;
        }
    }
}
</style>