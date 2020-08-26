import Vue from "vue";
import Vuex from "vuex";
import routerStore from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        routerStore
    }
});
