

//统一管理用户相关的接口
import request from '@/utils/request'
import type { loginFormData,loginResponseData,userInfoResponseData } from './type'


//项目用户相关的请求地址
enum API{
    LOGIN_URL="/admin/acl/index/login",//POST 登录
    USERINFO_URL= "/admin/acl/index/info",//GET 获取用户信息
    LOGOUT_URL= "/admin/acl/index/logout",//POST  退出登录

}

//登录接口
export const reqLogin = (data:loginFormData)=>request.post<any,loginResponseData>(API.LOGIN_URL,data)

//获取用户信息
export const reqUserInfo = ()=>request.get<any, userInfoResponseData>(API.USERINFO_URL)

//退出登录
// 泛型的参数第二个是服务器返回的数据类型 第一个是传递过去的数据类型
export const reqLogout = ()=>request.post<any,any>(API.LOGOUT_URL)