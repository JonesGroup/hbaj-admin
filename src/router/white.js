// 路由白名单

const asyncComponent = path => import(`/* webpackChunkName: ${path} */ "@/views${path}"`);

const white = [
    {
        path: "/login",
        name: "Login",
        meta: {
            title: "登录"
        },
        component: asyncComponent("/white/Login/index.vue")
    },
    {
        path: "/forget",
        name: "Forget",
        meta: {
            title: "忘记密码"
        },
        component: asyncComponent("/white/Forget/index.vue")
    },
    {
        path: "/404",
        name: "notFount",
        component: asyncComponent("/white/404/index.vue"),
        meta: {
            title: "找不到页面"
        }
    }
];

export default white;
