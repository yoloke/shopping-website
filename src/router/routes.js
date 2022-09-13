
export default [
    {
        path: "*",
        redirect: "/home"

    },
    {
        name: 'home',
        path: "/home",
        component: () => import("@/pages/Home"),
        meta: { show: true }
    },
    {
        name: "search",
        path: "/search/:keyword?",
        component: () => import("@/pages/Search"),
        meta: { show: true }
    },
    {
        name: 'login',
        path: "/login",
        component: () => import("@/pages/Login")
    },
    {
        path: "/register",
        component: () => import("@/pages/Register")
    },
    {
        path: "/detail/:skuId",
        component: () => import("@/pages/Detail"),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: () => import("@/pages/AddCartSuccess"),
        //路由元信息,控制当前路由是否需要Footer组件
        meta: { show: true },
    },
    {
        name: 'shopCart',
        path: "/shopCart",
        component: () => import("@/pages/ShopCart"),
    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import("@/pages/Trade"),
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
        component: () => import("@/pages/Pay"),
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
        component: () => import("@/pages/PaySuccess"),
        meta: { show: true }
    },
    {
        path: '/center',
        redirect: '/center/myorder'
    },
    {
        path: '/center',
        component: () => import("@/pages/Center"),
        meta: { show: true },
        //二级路由配置的地方
        children: [
            //我的订单
            {
                path: 'myorder',
                component: () => import("@/pages/Center/MyOrder"),
            }
            ,
            {
                path: 'teamorder',
                component: () => import("@/pages/Center/TeamOrder"),
            }
        ]
    },
]