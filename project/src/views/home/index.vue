<template>
    <div>
        <el-card class="userInfo">
                <img :src="userStore.avatar" alt="">

                {{ userStore.username }}

        </el-card>
    </div>
</template>

<script setup lang="ts" name="Home">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';

let userStore = useUserStore()


</script>

<style lang="scss" scoped>
.userInfo {
    display: flex;
    font-size: 40px;
    margin-top: 10px;
}
img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        vertical-align:middle;
        margin-right: 10px;
    }
</style>