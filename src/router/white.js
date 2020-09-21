// 路由白名单

const white = [
    {
        path: "/login",
        name: "Login",
        meta: {
            title: "登录"
        },
        component: () => import("@/views/Login/index.vue")
    },
    {
        path: "/forget",
        name: "Forget",
        meta: {
            title: "忘记密码"
        },
        component: () => import("@/views/Forget/index.vue")
    }
];

export default white;
