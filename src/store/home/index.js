
import api from '@/api'
//home小仓库
const state = {
    //服务器返回的是数组 初始化就是空数组
    //三级分类的数据
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor数据
    floorLists: []
}
const actions = {
    //通过API接口函数调用，获取三级联动数据
    async categoryList({ commit }) {
        let result = await api.reqCateGoryList();
        if (result.code == 200) {
            commit("CATEGORY_List", result.data)
        }
    },
    //获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await api.reqBannerList()
        if (result.code === 200) {
            commit("BANNERLIST", result.data)
        }
    },
    //获取Floor组件的数据
    async getFloorList({ commit }) {
        let result = await api.reqFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data);
        }
    }
    //#region
    /*返回了一个promise,证明这是一个promise请求，
    但是我们想要的是图片中的data数据。
    没有将函数封装前我们都会通过then()回调函数拿到服务器返回的数据，
    现在我们将其封装了，
    依然可以使用then获取数据，
    代码如下 */
    //  categoryList() {
    //     let result = reqCateGoryList().then(
    //         res => {
    //             console.log("res")
    //             console.log(res)
    //             return res
    //         }
    //     )
    //     console.log("result")
    //     console.log(result)
    // }
    //#endregion
}
const mutations = {
    //把收到的三级联动数据存入state中
    CATEGORY_List(state, categoryList) {
        state.categoryList = categoryList
    },
    //轮播图数据
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    //floor数据
    GETFLOORLIST(state, floorLists) {
        state.floorLists = floorLists;
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters

}