const router = [
    {
        path: "luxuryBoat", // 子路由不能加/path/ 不然匹配不成功
        name: "luxuryBoat",
        meta: {
            title: "豪华游轮"
        },
        component: () => import("@/views/home/HomeManage/Banner/index.vue")
    },
    {
        path: "bulkBoat",
        name: "bulkBoat",
        meta: {
            title: "散货船"
        },
        component: () => import("@/views/home/HomeManage/News/index.vue")
    }
];

export default router;
