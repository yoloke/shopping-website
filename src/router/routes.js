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

import MyOrder from '@/pages/Center/MyOrder'
import TeamOrder from '@/pages/Center/TeamOrder'
export default [
    {
        path: "*",
        redirect: "/home"

    },
    {
        name: 'home',
        path: "/home",
        component: Home,
        meta: { show: true }
    },
    {
        name: "search",
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true }
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
        meta: { show: true }
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
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { show: true },
        //路由独享守卫 从购物车来才能到结算页
        // beforeEnter: (to, from, next) => {
        //     if (from.path === '/shopCart') {
        //         next()
        //     } else {
        //         next(false)
        //     }
        // }
    }, {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        //路由独享守卫 从购物车来才能到结算页
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        redirect: '/center/myorder'
    },
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        //二级路由配置的地方
        children: [
            //我的订单
            {
                path: 'myorder',
                component:
                    MyOrder
            }
            ,
            {
                path: 'teamorder',
                component: TeamOrder
            }
        ]
    },
    // {
    //     path: '/communication',
    //     component: () => import('@/pages/Communication/Communication'),
    //     children: [
    //         {
    //             path: 'event',
    //             component: () => import('@/pages/Communication/EventTest/EventTest'),
    //             meta: {
    //                 show: false
    //             },
    //         },
    //         {
    //             path: 'model',
    //             component: () => import('@/pages/Communication/ModelTest/ModelTest'),
    //             meta: {
    //                 show: false
    //             },
    //         },
    //         {
    //             path: 'sync',
    //             component: () => import('@/pages/Communication/SyncTest/SyncTest'),
    //             meta: {
    //                 show: false
    //             },
    //         },
    //         {
    //             path: 'attrs-listeners',
    //             component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
    //             meta: {
    //                 show: false
    //             },
    //         },
    //         {
    //             path: 'children-parent',
    //             component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
    //             meta: {
    //                 show: false
    //             },
    //         },
    //         {
    //             path: 'scope-slot',
    //             component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
    //             meta: {
    //                 show: false
    //             },
    //         }
    //     ],
    // },
]