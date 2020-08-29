// 路由白名单

const white = [
    {
        path: "login",
        name: "Login",
        meta: {
            title: "登录"
        },
        component: () => import("@/views/Login/index.vue")
    }
];

export default white;
