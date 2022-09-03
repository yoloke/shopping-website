//search模块的小仓库
import api from '@/api'
let state = {
    //搜索模块返回的数据,是一个对象
    searchList: {},
    attrsList:[]
};
let actions = {
    //searchParams形参，当派发action时，至少是一个空对象
    async getSearchList({ commit }, searchParams = {}) {
        let result = await api.reqSearchList(searchParams);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};

let mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
        state.attrsList = searchList.attrsList.slice(0, 6);
    }
};
//getters:仓库的计算属性
//项目中:vuex的getters,为了简化数据而生。
let getters = {
    //计算新的属性:state,当前小仓库的数据
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    //品牌的数据
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    // //商品属性
    // attrsList(state) {
    //     return state.searchList.attrsList.slice(0, 6);
    // }
    total() {
        return state.searchList.total;
    }
};

//对外暴露
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}