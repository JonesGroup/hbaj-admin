const router = [
    {
        path: "list", // 子路由不能加/path/ 不然匹配不成功
        name: "list",
        meta: {
            title: "项目列表",
            keepAlive: true
        },
        component: () => import("@/views/home/CoursewareManage/list/index.vue")
    },
    {
        path: "courseDetail/:id",
        name: "courseDetail",
        meta: {
            title: "项目详情",
            hidden: true,
            isBack: true,
            keepAlive: false
        },
        component: () => import("@/views/home/CoursewareManage/courseDetail/index.vue")
    }
];

export default router;
