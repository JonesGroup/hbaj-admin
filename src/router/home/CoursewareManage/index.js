// 课件管理
import children from "./children"; // 子路由
export default {
    path: "coursewareManage", // 子路由不能加/path/ 不然匹配不成功
    name: "CoursewareManage",
    meta: {
        title: "课件管理"
    },
    children,
    component: () => import("@/views/home/CoursewareManage/index.vue")
};
