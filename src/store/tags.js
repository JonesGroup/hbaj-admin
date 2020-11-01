let tags;

try {
    const local = sessionStorage.getItem("TAGS") || "";
    tags = JSON.parse(local);
} catch (error) {
    tags = [];
}
const isAdd = (tags, tag) => {
    // 是否可以添加进入-根据name判断
    if (!tag.name) {
        return true;
    }
    return tags.some(item => item.name === tag.name);
};
const state = {
    tags: tags || []
};

const mutations = {
    ADD_TAGS(state, route) {
        state.tags = state.tags.concat(route);
        // if (!isAdd(state.tags, route)) {

        // }

        sessionStorage.setItem("TAGS", JSON.stringify(state.tags));
    }
};

export default {
    state,
    mutations
};
