import request from "@/utils/request";
import type {CategoryResponsData,Attr} from './type.ts'
//这里书写属性api
//GET /admin/product/getCategory1
//GET /admin/product/getCategory2/{category1Id}
// GET /admin/product/getCategory3/{category2Id}
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
//POST /admin/product/saveAttrInfo
//DELETE /admin/product/deleteAttr/{attrId}
enum API{
    C1_URL = "/admin/product/getCategory1",
    C2_URL = "/admin/product/getCategory2/",
    C3_URL = "/admin/product/getCategory3/",
    ATTR_URL = "/admin/product/attrInfoList/",
    ADDORUPDATE_URL="/admin/product/saveAttrInfo",
    //删除某一个已有的属性
    DELETEA_URL = "/admin/product/deleteAttr/"
}

//获取一级分类接口的方法
export const reqGetC1 = ()=>request.get<any,CategoryResponsData>(API.C1_URL)

//获取二级分类接口的方法
export const reqGetC2 = (category1Id:number|string)=>request.get<any, CategoryResponsData>(API.C2_URL+category1Id)

//获取三级分类接口的方法
export const reqGetC3 = (category2Id:number|string)=>request.get<any,CategoryResponsData>(API.C3_URL+category2Id)

//获取属性与属性值接口
export const reqAttr = (category1Id:number|string,category2Id:number|string,category3Id:number|string)=>request.get<any,any>(API.ATTR_URL+`${category1Id}/${category2Id}/${category3Id}`);

//添加或修改 属性值
export const reqAddOrUpdateAttr = (data:Attr)=>request.post<any,any>(API.ADDORUPDATE_URL,data)

//删除属性
export const reqRemoveAttr = (attrId:number)=>request.delete<any,any>(API.DELETEA_URL+attrId)