import Vue from 'vue'
import App from './App.vue'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//全局组件---三级联动组件
import TypeNav from "@/components/TypeNav"
Vue.component(TypeNav.name, TypeNav)

//分页器组件
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name, Pagination)


//引入路由
import router from "@/router"

//引入仓库
import store from './store'



import '@/mock'


//引入Swiper样式
import 'swiper/css/swiper.css'


Vue.config.productionTip = false

new Vue({
  // 全局事件总线$bus配置
  beforeCreate() {
    //此处的this就是这个new Vue()对象
    //网络有很多bus通信总结，原理相同，换汤不换药
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
