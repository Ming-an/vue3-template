//创建小仓库user
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import type { loginFormData,loginResponseData,userInfoResponseData } from '@/api/user/type'

//引入路由常量路由
import { constantRoute } from "@/router/routes";

let useUserStore = defineStore('User', {

    //小仓库存储数据的地方
    state: (): UserState => {
        return {
            token: GET_TOKEN() || '',//用户唯一标识的token
            menuRoutes: constantRoute,//仓库存储菜单需要的数据
            username: '',
            avatar: ''
        }
    },

    actions: {
        //用户登录的方法
        async userLogin(data: loginFormData) {
            let result:loginResponseData = await reqLogin(data);
            // console.log(result)
            if (result.code == 200) {
                this.token = (result.data as string);
                SET_TOKEN(result.data)
                return 'ok';
            } else {
                return Promise.reject(new Error(result.data))
            }
        },

        //获取用户信息
        async userInfo() {
            let result:userInfoResponseData = await reqUserInfo();
            // console.log(result)
            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar
                return 'OK'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },

        //退出登录
        async userLogout() {
            let result:any = await reqLogout();
            // console.log(result)
            if(result.code == 200){
                this.token = '';
                this.username = '';
                this.avatar = '';
                REMOVE_TOKEN();
                return 'ok';
            }else{
                return Promise.reject(new Error(result.message))
            }
        }
    },

    getters: {

    }
})

export default useUserStore