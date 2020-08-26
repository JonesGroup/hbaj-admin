/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:04:37
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

import home from "./home"; // 主页一级模块

Vue.use(Router);

export const router = [home];

// export default new Router({
//     // 河南太平洋保险 hd---河南 保险--insurance  requireLogin为true必须登录的页面
//     mode: "history",
//     scrollBehavior(to, from, savePosition) {
//         if (savePosition) {
//             return savePosition;
//         } else {
//             return { x: 0, y: 0 };
//         }
//     },
//     routes: [
//         {
//             path: "/my/p_ditor/:taskId/:projectId/:from",
//             name: "panoEditor",
//             component: () => import("@/views/my/panoEditor"),
//             meta: {
//                 title: "全景编辑器"
//                 // requireLogin: true
//             }
//         }
//     ]
// });
