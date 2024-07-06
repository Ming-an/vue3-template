<template>
    <!-- 展示内容区 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag"/>
        </transition>
    </router-view>
</template>

<script setup lang="ts" name="main">
import { watch,ref,nextTick } from 'vue';
import  useLayOutSettingStore from '@/store/modules/setting'

let LayOutSettingStore = useLayOutSettingStore()
//控制当前组件是否销毁重建
let flag = ref(true);
//监听仓库内部数据是否发生变化
watch(()=>LayOutSettingStore.refsh, ()=>{
    //点击刷新按钮
    flag.value = false

    //dom销毁完毕后会执行
    nextTick(()=>{
        flag.value = true
    })
})
</script>
<style lang="scss" scoped>
// 加上过渡动画
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all .5s;
}

.fade-enter-to {
    opacity: 1;

}
</style>