<template>
    <div>
        <Category></Category>
        <div>
            <el-card style="margin-top:20px">
                <el-button icon="plus" type="primary">添加spu</el-button>
                <el-table border style="margin-top:10px; margin-bottom: 10px;">
                    <el-table-column label="序号" width="80px" prop="index" align="center">
                    </el-table-column>
                    <el-table-column label="SPU名称">
                    </el-table-column>
                    <el-table-column label="SPU描述">
                    </el-table-column>
                    <el-table-column label="操作">
                        <el-button icon="Plus" type="primary"></el-button>
                        <el-button icon="Edit" type="primary"></el-button>
                        <el-button icon="Info" type="primary"></el-button>
                        <el-button icon="Delete" type="primary"></el-button>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                    :page-sizes="[3,5,10]" :size="size" :disabled="disabled" :background="true"
                    layout="prev, pager, next, jumper,->,total, sizes, " :total="400" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
</script>
<style lang="scss" scoped></style>