
//当前模块，API进行统一管理，即对请求接口统一管理
import requests from "@/api/request";
//mockde
import mockRequests from "./mockAjax";



//对外暴露函数
export default {
    //获取搜索页数据
    reqSearchList(params) {
        return requests({
            url: '/list',
            method: 'post',
            data: params
        })
    },
    //获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get   
    reqGoodsInfo(skuId) {
        return requests({
            url: `/item/${skuId}`,
            method: 'get',
        });
    },
    //商品详情页加入购物车/对已有商品数量的修改
    reqAddOrUpdateShopCart(skuId, skuNum) {
        return requests({
            url: `/cart/addToCart/${skuId}/${skuNum}`,
            method: 'post'
        })
    },

    //获取用户购物车的数据接口
    reqShopCart() {
        return requests({
            url: '/cart/cartList',
            method: 'get'
        })
    },
    //修改某一个商品的勾选的状态
    reqUpdateChecked(skuId, isChecked) {
        return requests({
            url: `/cart/checkCart/${skuId}/${isChecked}`,
            method: 'get'
        })
    },
    reqDeleteCartById(skuId) {
        return requests({
            url: `/cart/deleteCart/${skuId}`,
            method: 'delete'
        });
    },
    //获取分级列表数据
    reqCateGoryList() {
        return mockRequests({
            url: '/typenav',
            method: 'GET'
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
    },
    //获取验证码
    reqGetCode(phone) {
        return requests({
            url: `/user/passport/sendCode/${phone}`,
            method: 'get'
        });
    },
    //注册的接口
    reqRegister(data) {
        return requests({
            url: `/user/passport/register`,
            method: 'post', data
        });
    },
    //登录的接口:请求体携带参数 phone&&password
    reqUserLogin(data) {
        return requests({
            url: `/user/passport/login`,
            method: 'post', data
        })
    },
    //获取用户登录成功以后用户信息的接口
    reqUserInfo() {
        return requests({
            url: `/user/passport/auth/getUserInfo`,
            method: 'get'
        });
    },


    //退出登录业务
    reqUserLogout() {
        return requests({
            url: `/user/passport/logout`,
            method: 'get'
        });
    },



    //获取用户地址信息
    reqAddressInfo() {
        return requests({
            url: `/user/userAddress/auth/findUserAddressList`,
            method: 'get'
        });
    },


    //获取商品清单数据
    ereqShopInfo() {
        return requests({
            url: `/order/auth/trade`,
            method: 'get'
        })
    },

    // //提交订单接口
    // reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });

    // //获取支付信息接口
    // reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

    // //查询支付结果
    // reqPayResult = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });


    // //获取我的订单
    // reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });


}



