import { home } from "@/model/api";
import Vue from "vue";

export const getDefaultInfo = async () => {
    try {
        const data = await home(
            {
                type: "get"
            },
            "defaultInfo"
        );
        Vue.prototype.globalConfig.defaultInfo = data.data || {};
        return data;
    } catch (error) {
        console.log(error);
    }
};
