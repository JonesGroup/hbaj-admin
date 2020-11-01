import Vue from "vue";
import Vuex from "vuex";
import routerStore from "./router";
import tipsStore from "./tips";
import tagsStore from "./tags";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        routerStore,
        tipsStore,
        tagsStore
    }
});
