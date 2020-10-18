let tips;

try {
    const local = sessionStorage.getItem("TIPS") || "";
    tips = JSON.parse(local);
} catch (error) {
    tips = "";
}

const state = {
    tips: tips || ""
};

const mutations = {
    SET_TIPS(state, tips) {
        state.tips = tips;
        sessionStorage.setItem("TIPS", JSON.stringify(tips));
    }
};

export default {
    state,
    mutations
};
