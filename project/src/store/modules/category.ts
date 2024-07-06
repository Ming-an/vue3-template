//商品分类全局组件的小仓库
import {defineStore} from 'pinia';
import {reqGetC1,reqGetC2,reqGetC3} from '@/api/product/attr/index.ts'
let useCategoryStore = defineStore('Category',{
    state:()=>{
        return{
            //存储一级分类id
            c1Id:'',
            c2Id:'',
            c3Id:'',
            //存储每一个分类的列表
            category1IdList:[],
            category2IdList:[],
            category3IdList:[],
        }
    },
    actions:{
        async getCategory1Id (){
            let result = await reqGetC1();
            // console.log(result)
            if (result.code == 200) {
                this.category1IdList = result.data
            }
        },
        async getCategory2Id() {
            let result = await reqGetC2(this.c1Id);
            // console.log(result)
            if(result.code == 200){
                this.category2IdList = result.data
            }
        },
        async getCategory3Id () {
            let result = await reqGetC3(this.c2Id);
            // console.log(result)
            if(result.code == 200){
                this.category3IdList = result.data
            }
        }
    },
    getters:{
        
    }
})

export default  useCategoryStore