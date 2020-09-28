const router = [
    {
        path: "understand", // 子路由不能加/path/ 不然匹配不成功
        name: "understand",
        meta: {
            title: "技术解读"
        },
        component: () => import("@/views/home/HomeManage/Banner/index.vue")
    },
    {
        path: "english",
        name: "english",
        meta: {
            title: "专业英语"
        },
        component: () => import("@/views/home/HomeManage/News/index.vue")
    },
    {
        path: "contextualModel",
        name: "contextualModel",
        meta: {
            title: "情景模式"
        },
        component: () => import("@/views/home/HomeManage/Course/index.vue")
    }
];

export default router;
