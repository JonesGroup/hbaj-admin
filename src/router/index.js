/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:04:37
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

// import home from "./home"; // 主页一级模块
import white from "./white"; // 白名单

Vue.use(Router);

// 数组需要动态挂载
// export const routes = [home];

// 实例
const router = new Router({
    mode: "history",
    routes: white
});

export default router;
