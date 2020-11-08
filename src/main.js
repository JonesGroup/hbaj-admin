/*
 * @Author: yangyuan
 * @Date: 2020-04-14 21:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-17 23:23:05
 * @Description:
 */
import Vue from "vue";
import "@/components/Global";
import Application from "./App.vue";
import router, { whiteList } from "./router";
import filters from "./filters";
import store from "./store";
import "@/widget/skeleton";
import ExtendRouter from "@/plugins/ExtendRouter";
import utils from "@/widget/utils";
import storeStorege from "@/widget/store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

const cookieAuthorization = utils.getCookie("authorization");

const cookieUserId = utils.getCookie("userId");

if (cookieUserId) {
    storeStorege.set("userId", cookieUserId, "cookieUserId");
}

if (cookieAuthorization) {
    storeStorege.set("authorization", cookieAuthorization, "local");
}

// /**
//  * 拓展router
//  */
// Vue.use(ExtendRouter, {
//     router,
//     store
// });

Vue.prototype.globalConfig = window.globalConfig;
let firstFlag = false;
router.beforeEach((to, from, next) => {
    if (window.localStorage.getItem("authorization")) {
        // 登录了情况
        if (to.name == "Login") {
            //解决登陆后 用户输入登录地址重定向到首页
            return next({ path: "/" });
        } else {
            // 第一次登陆
            if (!firstFlag) {
                firstFlag = true;
                store.dispatch("GenerateRoutes").then(() => {
                    // 注入vuex生成路由
                    next({
                        ...to,
                        replace: true
                    });
                });
            } else {
                next();
            }
        }
    } else {
        // 未登录情况
        if (whiteList.findIndex(item => item.path === to.path) !== -1) {
            // 在白名单中
            next();
        } else {
            if (firstFlag) {
                window.location.reload();
            } else {
                next("/login");
            }
        }
    }
});

router.afterEach(to => {
    document.title = to.meta.title;
});

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(Application)
});
