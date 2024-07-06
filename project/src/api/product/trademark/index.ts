// 品牌管理的模块接口

// GET /admin/product/baseTrademark/{page}/{limit}

import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark  } from './type'
enum API {
    //获取已有的品牌接口
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    //添加品牌
    ADDTRADEMARK_URL="/admin/product/baseTrademark/save",
    //修改品牌
    UPDATETRANDEMARK_URL="/admin/product/baseTrademark/update",
    //删除品牌
    DELETE_URL= "/admin/product/baseTrademark/remove/"
}

//获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`);

//新增品牌信息 或修改品牌信息 根据有无id
// POST /admin/product/baseTrademark/save
// PUT /admin/product/baseTrademark/update
//  "logoUrl": "string",
//   "tmName": "string"

export const reqAddOrUpdateTrademark = (data:TradeMark)=>{
    //修改已有品牌的数据
    if(data.id){
        return request.put<any, any>(API.UPDATETRANDEMARK_URL,data);
    }else{
        //新增品牌
        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}

//删除已有的品牌
// DELETE /admin/product/baseTrademark/remove/{id}
export const reqDeleteTrademark = (id:number)=>request.delete<any,any>(API.DELETE_URL+id)