// 授权管理
import children from "./children"; // 子路由
export default {
    path: "authManage", // 子路由不能加/path/ 不然匹配不成功
    name: "AuthManage",
    meta: {
        title: "授权管理"
    },
    children,
    component: () => import("@/views/home/AuthManage/index.vue")
};
