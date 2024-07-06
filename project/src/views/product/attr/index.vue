<template>
    <div>
        <!-- 三级分类全局组件 -->
        <Category @getCategoryId="getCategoryIdFun" :scene="scene"></Category>
        <div>
            <el-card style="margin:15px 0 ">
                <div v-show="scene == 0">
                    <el-button type="primary" icon="plus" :disabled="!categoryStore.c3Id"
                        @click="changeScene">添加平台属性</el-button>

                    <el-table style="margin:10px 0 " border :data="attrAttr">
                        <el-table-column label="序号" width="80px" align="center" type="index">

                        </el-table-column>
                        <el-table-column label="属性名称" prop="attrName">

                        </el-table-column>
                        <el-table-column label="属性值名称" prop="attrValueList">
                            <template #="{ row, $index }">
                                <el-tag v-for="(attr, index) in row.attrValueList" :key="attr.id"
                                    style="margin:10px 10px">
                                    {{ attr.valueName }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #="{ row, $index }">
                                <el-button size="small" icon="Edit" type="primary" @click="updateAttr(row)">
                                </el-button>
                                <el-popconfirm :title="`你确定要删除${row.attrName}吗`" @confirm="deleteAttr(row.id)">
                                    <template #reference>
                                        <el-button size="small" icon="Delete" type="primary" >
                                        </el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-show="scene == 1">
                    <el-form>
                        <el-form-item label="属性值名称" style="width: 300px;">
                            <el-input placeholder="请输入属性值" v-model="attrParams.attrName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="Plus" type="primary" :disabled="!attrParams.attrName"
                                @click="addAttrValue">添加属性值名称</el-button>
                            <el-button icon="Plus" @click="cancelScene">取消</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-table border :data="attrParams.attrValueList">
                                <el-table-column type="index" align="center" label="序号" width="80px"></el-table-column>
                                <el-table-column label="属性值">
                                    <template #="{ row, $index }">
                                        <el-input :ref="(vc: any) => inputArr[$index] = vc" size="small"
                                            placeholder="请输入属性值名称" v-model="row.valueName" v-if="row.flag"
                                            @blur="toLook(row, $index)" @focus=""></el-input>
                                        <span v-else @click="toEdit(row, $index)">{{ row.valueName }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template #="{ row, $index }">
                                        <el-button icon="Delete" size="small" type="danger"
                                            @click="attrParams.attrValueList.splice($index, 1)"></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveAttrParams"
                                :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                            <el-button @click="cancelScene">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, nextTick,onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr';
import type { Attr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore();
let scene = ref<number>(0)
//收集新增属性的的数据
let attrParams = reactive<Attr>({
    attrName: '',//新增的属性值名称
    attrValueList: [
        //新增属性值数组
    ],
    categoryId: '',//三级分类id

    categoryLevel: 3//代表三级分类
})
//准备一个数组存储对应的组件实例 el-input
let inputArr = ref<any>([])
watch(() => categoryStore.c3Id, () => {
    attrAttr.value = []
    if (!categoryStore.c3Id) return;
    getAttr()
})
//存储已有的属性与属性值
let attrAttr = ref([])
//获取attr
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore;
    let result = await reqAttr(c1Id, c2Id, c3Id);
    // console.log(result)
    if (result.code == 200) {
        attrAttr.value = result.data
    } else {
        ElMessage({
            type: 'error',
            message: '获取失败'
        })
    }
}

//点击添加属性的按钮
const changeScene = () => {
    //清空上一次的数据 与空的合并一下
    Object.assign(attrParams, {
        attrName: '',//新增的属性值名称
        attrValueList: [
            //新增属性值数组
        ],
        categoryId: '',//三级分类id
        categoryLevel: 3//代表三级分类
    })
    scene.value = 1
    attrParams.categoryId = categoryStore.c3Id

}
//updateAttr table表格编辑页面的回调
const updateAttr = (row: any) => {
    scene.value = 1;
    //将已有的属性值对象赋值给attrParams
    //Object.assign
    //在编辑的时候显示点击的哪个
    //lodash   JSON.stringify JSON.parse 深拷贝
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))

}
//在添加属性值 页面 取消按钮的回调
const cancelScene = () => {
    scene.value = 0
}

//添加属性值按钮的回调
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,
    });
    nextTick(() => {
        //在添加的时候最后一个也要自动聚焦
        inputArr.value[attrParams.attrValueList.length - 1].focus()
    })
}

//点击保存按钮的时候 发起请求
const saveAttrParams = async () => {
    let result = await reqAddOrUpdateAttr(attrParams);
    //    console.log(result)
    if (result.code == 200) {
        //切换场景
        scene.value = 0;
        ElMessage({
            type: 'success',
            message: attrParams.id ? "修改成功" : "添加成功"
        });
        //获取已有的属性和属性值
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? "修改失败" : "添加失败"
        })
    }
}

//编辑 与查看的切换
const toLook = (row: any, $index: number) => {
    if (row.valueName.trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        //删除为空的元素
        attrParams.attrValueList.splice($index, 1)
        return
    }
    let repeat = attrParams.attrValueList.find((item: any) => {
        if (item != row) {
            return item.valueName === row.valueName
        }
    })
    if (repeat) {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return
    }
    row.flag = false
}
const toEdit = (row: any, $index) => {
    row.flag = true;
    nextTick(() => {
        inputArr.value[$index].focus()
    })
}

//自动获取焦点的函数
const handler = (element) => {
    //模板的结构发生变化会触发

}

//删除属性
const deleteAttr = async (id: number) => {
    let result = await reqRemoveAttr(id);
    if(result.code == 200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getAttr()
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
}

//当路由组件销毁的时候把仓库清空
onBeforeUnmount(()=>{
    categoryStore.$reset()
})
</script>
<style lang="scss" scoped></style>