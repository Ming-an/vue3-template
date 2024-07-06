<template>
    <div>
        <el-card>
            <el-form inline="true">
                <el-form-item label=" 一级分类">
                    <el-select placeholder="请选择分类" size="large" style="width: 200px" v-model="categoryStore.c1Id" @change="handlerC2" :disabled="scene==1?true:false">
                        <el-option v-for="(c1, index) in categoryStore.category1IdList" :key="c1.id" :label="c1.name"
                            :value="c1.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label=" 二级分类">
                    <el-select placeholder="请选择分类" size="large" style="width: 200px" v-model="categoryStore.c2Id" @change="handlerC3" :disabled="scene==1?true:false">
                        <el-option v-for="(c2, index) in categoryStore.category2IdList" :key="c2.id" :label="c2.name" :value="c2.id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label=" 三级分类">
                    <el-select placeholder="请选择分类" size="large" style="width: 200px" v-model="categoryStore.c3Id" :disabled="scene==1?true:false">
                        <el-option v-for="(c3, index) in categoryStore.category3IdList" :key="c3.id" :label="c3.name" :value="c3.id" />
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqGetC1, reqGetC2, reqGetC3 } from '@/api/product/attr'
import { onMounted, ref, reactive, watch } from 'vue';
import useCategoryStore from '@/store/modules/category'
let  categoryStore = useCategoryStore();
onMounted(() => {
    getC1()
})
const  getC1 = ()=>{
    categoryStore.getCategory1Id()
}

//当一级分类菜单改变的时候触发 @change
const handlerC2 = ()=>{
    //将二级三级分类清空
    categoryStore.c2Id = '';
    categoryStore.category3IdList = [];
    categoryStore.c3Id = '';
    categoryStore.getCategory2Id()
}

const handlerC3 = ()=>{
    categoryStore.category3IdList = [];
    categoryStore.c3Id = '';
    categoryStore.getCategory3Id()
}
//接受父组件传递过来的场景值
defineProps(['scene'])
// //子给父亲 自定义事件
// const emit = defineEmits(['getCategoryId'])
// //一级分类的的数据
// const category1IdList = ref<any>([])
// const category2IdList = ref<any>([])
// const category3IdList = ref<any>([])
// //收集一级分类的id
// const c1Id = ref<number>()
// const c2Id = ref<number>()
// const c3Id = ref<number>()

// const getCategory1Id = async () => {
//     let result = await reqGetC1();
//     // console.log(result)
//     if (result.code == 200) {
//         category1IdList.value = result.data
//     }
// }
// const getCategory2Id = async () => {
//     let result = await reqGetC2(c1Id.value);
//     // console.log(result)
//     if(result.code == 200){
//         category2IdList.value = result.data
//     }
// }
// const getCategory3Id = async () => {
//     let result = await reqGetC3(c2Id.value);
//     // console.log(result)
//     if(result.code == 200){
//         category3IdList.value = result.data
//     }
// }
// watch(()=>c1Id.value,(newVlaue, oldValue)=>{
//     getCategory2Id(newVlaue)
// })
// watch(()=>c2Id.value,(newValue, oldValue)=>{
//     getCategory3Id(newValue);
// })
// watch(()=>c3Id.value, (newVlaue, oldValue)=>{
//     emit('getCategoryId',c1Id.value,c2Id.value,c3Id.value)
// })
</script>
<style lang="scss" scoped></style>