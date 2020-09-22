// 素材管理
import children from "./children"; // 子路由
export default {
    path: "materialManage", // 子路由不能加/path/ 不然匹配不成功
    name: "MaterialManage",
    meta: {
        title: "素材管理"
    },
    children,
    component: () => import("@/views/home/MaterialManage/index.vue")
};
