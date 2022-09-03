
//当前模块，API进行统一管理，即对请求接口统一管理

import requests from "@/api/request";
//mockde
import mockRequests from "./mockAjax";

//对外暴露函数
export default {
    reqCateGoryList() {
        return requests({
            url: '/product/getBaseCategoryList',
            method: 'GET'
        })
    },
    //获取搜索页数据
    reqSearchList(params) {
        return requests({
            url: '/list',
            method: 'post',
            data:params
        })
    },
    //获取首页轮播图数据的接口
    reqBannerList() {
        return mockRequests({
            url: '/banner',
            method: 'get'
        });
    },
    //获取Floor数据接口
    reqFloorList() {
        return mockRequests({
            url: '/floor',
            method: 'get'
        })
    }

}



