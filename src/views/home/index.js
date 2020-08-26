// 一级导航
import HomeManage from "./HomeManage"; // 主页管理
import ShippingManage from "./ShippingManage"; // 船只管理
import CoursewareManage from "./CoursewareManage"; // 课件管理
import AuthManage from "./AuthManage"; // 授权管理
import OrganizationManage from "./OrganizationManage"; // 机构管理
import UserManage from "./UserManage"; // 用户管理
import MaterialManage from "./MaterialManage"; // 素材管理

export default {
    path: "home",
    name: "home",
    meta: {
        title: "首页"
    },
    children: [HomeManage, ShippingManage, CoursewareManage, AuthManage, OrganizationManage, UserManage, MaterialManage]
    // component:
};
