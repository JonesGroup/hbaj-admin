// 船只管理
import children from "./children"; // 子路由
export default {
    path: "shippingManage", // 子路由不能加/path/ 不然匹配不成功
    name: "ShippingManage",
    meta: {
        title: "船只管理"
    },
    children,
    component: () => import("@/views/home/ShippingManage/index.vue")
};
