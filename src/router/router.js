//引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
export default [
    {
        path: "*",
        redirect: "/home"

    },
    {
        name: 'home',
        path: "/home",
        component: Home,
        meta: {
            show: true
        }
    },
    {
        name: "search",
        path: "/search/:keyword?",
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
    },
    {
        path: "/detail/:skuId",
        component: Detail,
        meta: {
            show: true
        }
    }
]