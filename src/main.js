import Vue from 'vue'
import App from './App.vue'


// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

//按需引入
import { MessageBox, Input, Form, FormItem,Button,Checkbox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Input)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(Button);


//全局组件---三级联动组件
import TypeNav from "@/components/TypeNav"
Vue.component(TypeNav.name, TypeNav)

//分页器组件
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name, Pagination)

import a from '@/plugin/a'
Vue.use(a, {
  loading: "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-sklaAbYPbAAHJf20K7J4980.jpg",
  error:"https://www.baidu.com/img/flexible/logo/pc/result.png"
})

//引入路由
import router from "@/router"

//引入仓库
import store from './store'

import api from './api'

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
    Vue.prototype.$api = api
  },
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
