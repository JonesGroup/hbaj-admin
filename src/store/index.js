import Vue from "vue";
import Vuex from "vuex";
import routerStore from "./router";
import tipsStore from "./tips";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        routerStore,
        tipsStore
    }
});
