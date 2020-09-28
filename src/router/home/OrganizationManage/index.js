// 机构管理
// import children from "./children"; // 子路由
export default {
    path: "organizationManage", // 子路由不能加/path/ 不然匹配不成功
    name: "OrganizationManage",
    meta: {
        title: "机构管理",
        icon: "icontubiao-36"
    },
    // children,
    component: () => import("@/views/home/OrganizationManage/index.vue")
};
