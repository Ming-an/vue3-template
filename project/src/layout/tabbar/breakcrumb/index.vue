<template>
    <el-icon style="margin-right: 10px;" @click="changeIcon">
        <component :is="LayOutSettingStore.fold?'Fold':'Expand'">
        </component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span style="margin:0px 5px">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts" name="BreakCrumb">
import { useRoute } from 'vue-router';
import {ref} from 'vue'
import  useLayOutSettingStore from '@/store/modules/setting'
//从仓库中间拿一个响应式数据控制图标切换
let LayOutSettingStore = useLayOutSettingStore()
let $route = useRoute()
//点击图标的方法
const changeIcon = ()=>{
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}

</script>
<style lang="scss" scoped>

</style>