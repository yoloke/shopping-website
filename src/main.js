import Vue from 'vue'
import App from './App.vue'

//全局组件---三级联动组件
import TypeNav from "@/components/TypeNav"
Vue.component(TypeNav.name, TypeNav)


//引入路由
import router from "@/router"

//引入仓库
import store from './store'

import '@/mock'


//引入Swiper样式
import 'swiper/css/swiper.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
