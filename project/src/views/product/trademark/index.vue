<template>
    <div>
        <el-card style="margin: 10px 10px;">
            <el-button icon="plus" type="primary" @click="addTrademark">添加品牌</el-button>
            <el-table border style="margin:10px 0px" :data="trademarkArr">
                <el-table-column label="序号" type="index" width="80px" align="center">

                </el-table-column>
                <el-table-column label="品牌名称" prop="tmName">

                </el-table-column>
                <el-table-column label="品牌LOGO" prop="logoUrl">
                    <template #="{ row, $index }">
                        <img :src="row.logoUrl" alt="" style="width:100px">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button size="small" type="primary" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`你确定要删除${row.tmName}?`" width="200px" icon="Delete" @confirm="removeTradeMark(row.id)">
                            <template #reference>
                                <el-button type="primary" icon="Delete" size="small"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
            -->
            <!-- v-model current-page 分页器当前页码 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 10]" background
                layout="prev, pager, next, jumper,->,sizes, total" :total="total" @current-change="handleCurrentChange"
                @size-change="handleSizeChange" />
        </el-card>



        <!-- 点击添加品牌的对话框 -->
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="500">
            <el-form style="width:80%" :model="trademarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar"
                            style="width:100%" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">确认</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark,reqDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type';
import { ElMessage, UploadProps } from 'element-plus';
//当前页面
let pageNo = ref<number>(1)
//每页限制条数
let limit = ref(3);
//控制对话框的显示与隐藏
let dialogFormVisible = ref(false)
let total = ref(0)
let trademarkArr = ref<Records>([])
//el-form 组件实例
let formRef = ref();
//定义收集新增的品牌数据
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
const getHasTrademark = async () => {
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
    // console.log(result)
    if (result.code == 200) {
        total.value = result.data.total;
        trademarkArr.value = result.data.records
    }
}
//组件挂载完毕
onMounted(() => {
    getHasTrademark()
})

//分页器当前页码发生变化的时候会触发
//组件pagination 父组件回传了数据 是当前的页码但是v-model双向绑定了
const handleCurrentChange = (page: number) => {
    // console.log(page)
    getHasTrademark()
}

//分页器当前每页 下拉菜单发生变化的时候 改变每页展示的条数
//同样v-model也双向绑定了
const handleSizeChange = (pageSize: number) => {
    //当前每页的数据量变化的时候 当前页码归一
    pageNo.value = 1
    getHasTrademark()
}

//添加品牌按钮的回调
const addTrademark = () => {
    formRef.value?.clearValidate()
    dialogFormVisible.value = true;
    trademarkParams.id = undefined;
    //收集数据清空
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';

    //第二种写法
    // nextTick(() => {
    //     formRef.value.clearValidate('tmName');
    //     formRef.value.clearValidate('logoUrl');
    // })
}

//点击编辑按钮的回调
const updateTrademark = async (row) => {
    //每次编辑前清空上一次的校验信息
    // nextTick(() => {
    //     formRef.value.clearValidate('tmName');
    //     formRef.value.clearValidate('logoUrl');
    // })
    dialogFormVisible.value = true;
    // console.log(row.logoUrl)

    // trademarkParams.tmName = row.tmName;
    // trademarkParams.logoUrl = row.logoUrl;
    // trademarkParams.id = row.id
    Object.assign(trademarkParams, row)
    // console.log(result)


}
//对话框 取消和确认按钮
const cancel = () => {
    dialogFormVisible.value = false;
}
const confirm = async () => {
    //在发送请求之前 要对整个表单进行校验
    //这个会触发图片的校验
    await formRef.value.validate();

    let result = await reqAddOrUpdateTrademark(trademarkParams);
    // console.log(result)
    try {
        dialogFormVisible.value = false;
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        })
        getHasTrademark(trademarkParams.id ? pageNo.value : 1);
        //收集数据清空
        trademarkParams.tmName = '';
        trademarkParams.logoUrl = ''
    } catch {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        })
    }


}

//图片上传之前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //约束文件类型和大小
    // png jpg gif 4M
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小小于4M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件类型只能是PNG|JPG|GIF'
        })
        return false;
    }
}

//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //response 即为当前这次上传图片Post 请求服务器返回的数据
    trademarkParams.logoUrl = response.data;
    //图片上传成功清空校验提示信息
    formRef.value.clearValidate('logoUrl')
}
//品牌校验的自定义规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('品牌名称位数不小于2位'))
    }
}


//品牌图片 自定义规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    if (value) {
        callBack();
    } else {
        callBack(new Error('图片不能为空'))
    }
}
//表单校验的规则对象
const rules = {
    tmName: [
        { required: true, trigger: 'blur', validator: validatorTmName },
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]

}

//删除品牌数据
const removeTradeMark = async(id:number)=>{
    let result = await reqDeleteTrademark(id);
    // console.log(result)
    if(result.code == 200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        // getHasTrademark(trademarkArr.value.length > 1?pageNo.value:pageNo.value - 1);
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>