import { home, appConstDetail } from "@/model/api";
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
        Vue.prototype.globalConfig.defaultInfo.APP_DEFAULT_MODULE = Vue.prototype.globalConfig.defaultInfo.APP_DEFAULT_MODULE.map(item => JSON.parse(item));
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

const appConstListFun = async () => {
    const appConstList = ["APP_DEFAULT_PREVIEW", "APP_DEFAULT_MODULE"];
    for (const item of appConstList) {
        // 串行
        const data = await appConstDetail({ type: "get", data: { name: item } }, "all");
        Vue.prototype.globalConfig[item] = (data.data || []).sort((a, b) => a.seq - b.seq);
        if (item === "APP_DEFAULT_MODULE") {
            Vue.prototype.globalConfig["APP_DEFAULT_MODULE"] = Vue.prototype.globalConfig["APP_DEFAULT_MODULE"]
                .map(item => ({ ...item, value: JSON.parse(item.value), Details: item.detail }))
                .map(item => ({ ...item, ...item.value }));
        }
    }

    // 这种应该是并行的
    // const list = appConstList.map(async item => await appConstDetail({ type: "get", data: { name: item } }, "all"));
    // const a = await Promise.all(list);
};

export const mapDefaultLis = async () => Promise.all([defaultBlocks(), getDefaultInfo(), appConstListFun()]);
