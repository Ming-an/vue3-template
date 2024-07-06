//分类相关的数据类型

export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

export interface CategoryObj{
    id:number|string,
    name:string,
    category1Id?:number,
    category2Id?:number,
    category3Id?:number
}

export interface CategoryResponsData extends ResponseData{
    data:CategoryObj[]
}

//定义属性与属性值的ts类型

//属性值的数据类型
export interface AttrValue{
    id?:number,
    valueName:string,
    attrId?:string,
    flag?:boolean
}
export type AttrValueList = AttrValue[]

export interface Attr{
    id?:number,
    attrName:string,
    categoryId:number|string,
    categoryLevel:number,
    attrValueList:AttrValueList
}

export type AttrList = Attr[];

export interface AttrResponseData extends ResponseData{
    data:Attr[]
}
