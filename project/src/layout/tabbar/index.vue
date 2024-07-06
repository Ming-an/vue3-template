<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breakcrumb></Breakcrumb>
        </div>
        
        <div class="tabbar_right">
            <Settingtab></Settingtab>
        </div>
    </div>
</template>

<script setup lang="ts" name="Tabbar">
import Breakcrumb from './breakcrumb/index.vue'
import Settingtab from './settingtab/index.vue'
</script>
<style lang="scss" scoped>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right{
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
}
</style>