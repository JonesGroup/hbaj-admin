import { filterRouter } from "@/permission/filterRouter";

import router, { routes } from "@/router";

const state = {
    routerMap: []
};

const mutations = {
    SET_ROUTERS(state, routerMap) {
        state.routerMap = routerMap;
    }
};

const actions = {
    GenerateRoutes({ commit }) {
        // 异步生成路由
        return new Promise(resolve => {
            const routerMap = filterRouter(routes);
            commit("SET_ROUTERS", routerMap);
            router.addRoutes(routerMap);
            resolve("路由生成完毕");
        });
    }
};

export default {
    state,
    mutations,
    actions
};
