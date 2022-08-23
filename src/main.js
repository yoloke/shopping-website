import Vue from 'vue'
import App from './App.vue'

//全局组件---三级联动组件
import TypeNav from "@/pages/Home/TypeNav"
Vue.component(TypeNav.name, TypeNav)
//引入路由
import router from "@/router"

//引入仓库
import store from './store'
//
import { reqCateGoryList } from './api'
reqCateGoryList()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
