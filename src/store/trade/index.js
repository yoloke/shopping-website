import api from "@/api";
const state = {
    address: [],
    tradeInfo: {},
    payId: ''
};
const actions = {
    //获取用户信息地址
    async getAddress({ commit, state, dispatch }) {
        let result = await api.reqAddressInfo();
        if (result.code == 200) {
            commit('GETADDRESS', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //获取商品清单
    async getShopInfo({ commit, state, dispatch }) {
        let result = await api.reqShopInfo();
        console.log(result);
        if (result.code == 200) {
            commit('GETSHOPINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //提交订单:tradeNO 交易编码   data:付款人信息
    async submitInfo({ commit, state, dispatch }, { tradeNo, data }) {
        //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
        let result = await api.reqSubmitOrder(tradeNo, data);
        if (result.code == 200) {
            commit('SUBMITINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }

};
const mutations = {
    GETADDRESS(state, address) {
        address = [
            {
                "id": 1,
                "userAddress": "北京市昌平区北七家镇宏福苑南一区0号楼0单元010",
                "userId": 2,
                "provinceId": 1,
                "consignee": "史蒂芬啊",
                "phoneNum": "18101085318",
                "isDefault": "0",
                "regionId": 1,
                "fullAddress": "北京北京市昌平区北七家镇宏福苑南一区0号楼0单元010"
            },
            {
                "id": 2,
                "userAddress": "通州区",
                "userId": 2,
                "provinceId": 1,
                "consignee": "格玛",
                "phoneNum": "18801999967",
                "isDefault": "0",
                "regionId": 1,
                "fullAddress": "北京通州区"
            },
            {
                "id": 3,
                "userAddress": "宏福苑南二区",
                "userId": 2,
                "provinceId": 1,
                "consignee": "李强",
                "phoneNum": "13812341234",
                "isDefault": "0",
                "regionId": 1,
                "fullAddress": "北京宏福苑南二区"
            }
        ]
        address[0].isDefault = 1
        state.address = address;
    },
    GETSHOPINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo;
    },
    SUBMITINFO(state, payId) {
        state.payId = payId;
    }
};
const getters = {
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}