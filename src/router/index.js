import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'

//引入插件
Vue.use(VueRouter)


//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
//2、重写push/replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
//第二个参数，成功的回调
//第三个参数，失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call和apply区别
        //相同点；都可以调用函数一次，都可以篡改函数的上下一次
        //不同点：call和apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

//配置路由
export default new VueRouter({
    routes: router,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // 始终滚动到顶部
        return { y: 0 }
    }
})