<template>
    <el-button type="default" size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button type="default" size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button type="default" size="small" icon="Setting" circle></el-button>
    <img :src="userStore.avatar" alt="" style="">

    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts" name="SettingTab">
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter()
let $route = useRoute()
let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
//刷新按钮的回调
const updateRefsh = () => {
    LayOutSettingStore.refsh = !LayOutSettingStore.refsh
};
//jwt json web token
//全屏按钮的回调
const fullScreen = () => {
    let full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen()
    }
}

//点击退出登录的回调
const logout = async () => {
    // 向退出登录接口发请求 不要token
    //清空用户数据 token username avatar
    //跳转到登录页面 
    await userStore.userLogout();
    $router.push({ path: '/login', query: { redirect: $route.path } })
} 
</script>
<style lang="scss" scoped>
img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
}
</style>