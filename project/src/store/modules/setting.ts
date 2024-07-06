//小仓库 layout 组件配置的仓库
import { defineStore } from "pinia";

let useLayOutSettingStore = defineStore('SettingStore',{
    state:()=>{
        return{
            fold:false,//用户控制菜单折叠还是收起的状态
            refsh:false,//控制刷新
        }
    }
})

export default useLayOutSettingStore