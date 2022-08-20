import Vue from 'vue'
import VueRouter from 'vue-router'

//引入插件
Vue.use(VueRouter)
//引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"



//配置路由
export default new VueRouter({
    routes: [
        {
            path: "*",
            redirect: "/home"

        },
        {
            path: "/home",
            component: Home,
            meta: {
                show: true
            }
        },
        {
            path: "/search/:keyWord",
            component: Search,
            meta: {
                show: true
            }
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/register",
            component: Register
        }
    ]
})