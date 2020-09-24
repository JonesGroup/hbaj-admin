// 路由白名单

import { asyncComponent } from "@/router/utils";

const white = [
    {
        path: "/login",
        name: "Login",
        meta: {
            title: "登录"
        },
        component: () => import("@/views/white/Login/index.vue")
    },
    {
        path: "/forget",
        name: "Forget",
        meta: {
            title: "忘记密码"
        },
        component: () => import("@/views/white/Forget/index.vue")
    },
    {
        path: "/404",
        name: "notFount",
        component: () => import("@/views/white/404/index.vue"),
        meta: {
            title: "找不到页面"
        }
    }
];

export default white;
