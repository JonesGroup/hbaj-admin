const router = [
    {
        path: "list", // 子路由不能加/path/ 不然匹配不成功
        name: "list",
        meta: {
            title: "角色授权列表"
        },
        component: () => import("@/views/home/AuthManage/role/list/index.vue")
    },
    {
        path: "detail/:id", // 子路由不能加/path/ 不然匹配不成功
        name: "detail",
        meta: {
            title: "角色授权管理详情",
            hidden: true
        },
        component: () => import("@/views/home/AuthManage/role/detail/index.vue")
    }
];

export default router;
