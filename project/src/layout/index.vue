<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Logo></Logo>
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar-height">
                <!-- 菜单组件 -->
                <el-menu :collapse="LayOutSettingStore.fold?true:false" :default-active="$route.path" background-color="#001529" text-color="white" :router="true"  active-text-color="pink" >
                    <!-- 根据路由动态生成标签 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航栏 -->
        <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts" name="Layout">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useRoute } from 'vue-router';

//获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
import  useLayOutSettingStore from '@/store/modules/setting'
let userStore = useUserStore()
let $route = useRoute()
let LayOutSettingStore = useLayOutSettingStore()


</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;

    // background-color: skyblue;
    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-meun-background;
        transition: all 0.3s;
        .scrollbar-height {
            width: 100%;
            height: calc(100vh - 50px);
            .el-menu{
                border-right: none;
            }
        }

        .scrollbar-demo-item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            margin: 10px;
            text-align: center;
            border-radius: 4px;
            background: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
        }

        &.fold{
            width: $base-menu-width-min;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabber-height;
        top: 0;
        left: $base-menu-width;
        border-bottom: 1px solid #ece3e1f5;
        transition: all 0.3s;
        &.fold{
            width:calc( 100vw -  $base-menu-width-min);
            left:$base-menu-width-min
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabber-height);
        left: $base-menu-width;
        top: $base-tabber-height;
        padding: 10px;
        overflow: auto;
        transition: all 0.3s;
        &.fold{
            left:$base-menu-width-min;
            width: calc(100vw -  $base-menu-width-min);
        }
    }
}
</style>