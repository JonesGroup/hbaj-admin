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

export const defaultBlocks = async () => {
    try {
        const data = await home(
            {
                type: "get"
            },
            "defaultBlocks"
        );
        Vue.prototype.globalConfig.defaultBlocks = (data.data || []).sort((a, b) => a.seq - b.seq);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const mapDefaultLis = async () => Promise.all([defaultBlocks(), getDefaultInfo()]);
