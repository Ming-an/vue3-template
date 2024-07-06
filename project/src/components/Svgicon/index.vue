<!-- svg -->
<template>
    <svg :style="{width, height}">
        <use :href="prefix+name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
    //xlink:href属性值的前缀
    prefix:{
        type:String,
        default:'#icon-'
    },
    //提供使用的图标名字
    name:String,
    color:{
        type:String,
        default:''
    },
    width:{
        type:String,
        default:'16px'
    },
    height:{
        type:String,
        default:'16px'
    }
})
</script>

<style lang="scss" scoped>

</style>