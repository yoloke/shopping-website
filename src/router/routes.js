//引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center'
export default [
    {
        path: "*",
        redirect: "/home"

    },
    {
        name: 'home',
        path: "/home",
        component: Home,
        meta: {show: true}
    },
    {
        name: "search",
        path: "/search/:keyword?",
        component: Search,
        meta: {show: true}
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/detail/:skuId",
        component: Detail,
        meta: {show: true}
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        //路由元信息,控制当前路由是否需要Footer组件
        meta: { show: true },
    },
    {
        name: 'shopCart',
        path: "/shopCart",
        component: ShopCart,
    },
    {
        name:'trade',
        path: '/trade',
        component: Trade,
        meta: { show: true }
    }, {
        path: '/pay',
        component: Pay,
        meta: { show: true }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
]