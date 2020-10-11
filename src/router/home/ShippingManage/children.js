const router = [
    {
        path: "shippList", // 子路由不能加/path/ 不然匹配不成功
        name: "shippList",
        meta: {
            title: "船舶列表"
        },
        component: () => import("@/views/home/ShippingManage/shippingList/index.vue")
    },
    {
        path: "shippDetail/:id", // 子路由不能加/path/ 不然匹配不成功
        name: "shippDetail",
        meta: {
            title: "船舶详情",
            hidden: true,
            isBack: true
        },
        component: () => import("@/views/home/ShippingManage/shippDetail/index.vue")
    }
];

export default router;
