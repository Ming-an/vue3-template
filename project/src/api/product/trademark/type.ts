//关于品牌管理的ts接口

/* 
{
  "code": 200,
  "message": "成功",
  "data": {
    "records": [
      {
        "id": 1,
        "tmName": "小米",
        "logoUrl": "http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKC6AQ-j2AAAb72A3EO0942.jpg"
      },
      {
        "id": 2,
        "tmName": "苹果",
        "logoUrl": "http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKHOADErHAAAQBezsFBo612.jpg"
      },
      {
        "id": 3,
        "tmName": "华为",
        "logoUrl": "http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKF2AWpcKAADv98DWYRo516.jpg"
      }
    ],
    "total": 50,
    "size": 3,
    "current": 1,
    "searchCount": true,
    "pages": 17
  },
  "ok": true
}



*/
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//已有品牌的数据类型
export interface TradeMark {
    id?: number,
    tmName: string,
    logoUrl: string
}

//包含全部品牌数据的ts类型
export type Records = TradeMark[];


//获取已有全部品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData {
    data: {
        records: Records;
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages:number
    }
}