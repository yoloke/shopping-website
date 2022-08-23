import Vue from 'vue'
import Vuex from 'vuex'

//需要使用插件
Vue.use(Vuex);

//引入小仓库
import home from './home'
import search from './search';


 
//对外暴露Store类的实例
export default new Vuex.Store({
    modules: {
        home,
        search
    }
})