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
            // 虽然是动态路由，但是无论何时以何种方式访问Router的路由，比如你想看看添加完动态路由后的所有路由，其实返回的始终是Router的初始路由，原因是Router的路由并不是响应式的，所以只能读取到初始路由
            router.addRoutes(routerMap);
            resolve(router);
        });
    }
};

export default {
    state,
    mutations,
    actions
};
