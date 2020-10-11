const router = [
    {
        path: "list", // 子路由不能加/path/ 不然匹配不成功
        name: "list",
        meta: {
            title: "机构管理列表"
        },
        component: () => import("@/views/home/OrganizationManage/organization/list/index.vue")
    },
    {
        path: "detail/:id",
        name: "detail",
        meta: {
            title: "机构管理-详情",
            hidden: true,
            isBack: true
        },
        component: () => import("@/views/home/OrganizationManage/organization/detail/index.vue")
    }
];

export default router;
