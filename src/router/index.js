import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

//引入插件
Vue.use(VueRouter)

//解决多次执行相同的push问题
//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
//2、重写push/replace
//第一个参数location：告诉原来的push，跳转的目标位置和传递了哪些参数
//第二个参数resolve，成功的回调
//第三个参数reject，失败的回调
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

//全局路由守卫
//全局守卫:只要项目中有任何路由变化，全局守卫都会进行拦截【符合条件走你，不符合条件不能访问】
//全局守卫:全局前置守卫【访问之前进行触发】


//全局后置守卫,几乎不用
// router.afterEach((to,from)=>{
//   console.log('后置守卫');
// })

//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // 始终滚动到顶部
        return { y: 0 }
    }
})
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //第一种：next(),放行函数，放行到它想去的路由！！！
    //第二种:next(path),守卫指定放行到那个路由去?

    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
    //token
    let hasToken = store.state.user.token;
    //用户信息
    let hasNickName = store.state.user.nickName;
    //判断用户是否登录
    if (hasToken) {
        //用户登录了,不能去login页面
        if (to.path == "/login") {
            next('/home');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasNickName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('user/getUserInfo');
                    next();
                } catch (error) {
                    //token失效了
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('user/logout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
});

export default router