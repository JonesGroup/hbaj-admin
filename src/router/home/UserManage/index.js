// 用户管理
import children from "./children"; // 子路由
export default {
    path: "userManage", // 子路由不能加/path/ 不然匹配不成功
    name: "UserManage",
    meta: {
        title: "用户管理",
        icon: "icontubiao-381"
    },
    children,
    component: () => import("@/views/home/UserManage/index.vue")
};
