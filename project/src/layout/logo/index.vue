<template>
    <div class="logo">
        <img :src="setting.logo" style="">
        <p :class="{fold:LayOutSettingStore.fold?true:false}">{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts" name="Logo">
import setting from '@/setting';
import  useLayOutSettingStore from '@/store/modules/setting'
//从仓库中间拿一个响应式数据控制图标切换
let LayOutSettingStore = useLayOutSettingStore()


</script>

<style lang="scss" scoped>
.logo{
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 40px;
        height: 40px;
        
    }
    p{
        font-size: $base-logo-title-fontsize;
        color:white;
        font-weight: bold;
        transition:linear 0.3s;
        &.fold{
            display: none;
        }
    }
}
</style>