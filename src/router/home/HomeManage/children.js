const router = [
    {
        path: "banner", // 子路由不能加/path/ 不然匹配不成功
        name: "Banner",
        meta: {
            title: "主页轮播图"
        },
        component: () => import("@/views/home/HomeManage/Banner/index.vue")
    },
    {
        path: "news",
        name: "News",
        meta: {
            title: "新闻资讯"
        },
        component: () => import("@/views/home/HomeManage/News/index.vue")
    },
    {
        path: "news/:type/:id?",
        name: "News",
        meta: {
            title: "新闻资讯"
        },
        component: () => import("@/views/home/HomeManage/News/detail/index.vue")
    },
    {
        path: "news/comment/:id",
        name: "News",
        meta: {
            title: "新闻资讯-处理评论"
        },
        component: () => import("@/views/home/HomeManage/News/comment/index.vue")
    },
    {
        path: "course",
        name: "Course",
        meta: {
            title: "公众课件"
        },
        component: () => import("@/views/home/HomeManage/Course/index.vue")
    },
    {
        path: "apps",
        name: "Apps",
        meta: {
            title: "平台应用"
        },
        component: () => import("@/views/home/HomeManage/Apps/index.vue")
    }
];

export default router;
