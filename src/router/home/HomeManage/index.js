// 主页管理
import children from "./children"; // 子路由
export default {
    path: "/homeManage",
    name: "HomeManage",
    meta: {
        title: "主页管理"
    },
    children,
    component: () => import("@/views/home/HomeManage/index.vue")
};
