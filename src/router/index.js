/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:04:37
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

import Layout from "@/components/Layout/index.vue"; // Layout
import home from "./home"; // 主页一级模块
import white from "./white"; // 白名单

Vue.use(Router);

// 数组需要动态挂载
export const routes = [
    {
        path: "/",
        redirect: "/home/homeManage/banner",
        name: "AppLayout",
        meta: {
            title: "首页"
        },
        component: Layout,
        children: [home] // 这一级预留头部做一级导航
    },
    {
        path: "*",
        redirect: "/404"
    }
];

export const whiteList = white;

// 解决 在使用ElementUi时点击同一个路由，页面报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

// 实例
const router = new Router({
    mode: "history",
    routes: white
});

export default router;
