const router = [
    {
        path: "role", // 子路由不能加/path/ 不然匹配不成功
        name: "role",
        meta: {
            title: "角色授权管理"
        },
        component: () => import("@/views/home/HomeManage/Banner/index.vue")
    }
];

export default router;
