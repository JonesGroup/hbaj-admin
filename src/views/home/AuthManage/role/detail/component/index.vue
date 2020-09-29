<template>
    <el-tabs v-model="tab_name" class="tag-container">
        <el-tab-pane :label="tag.name" :key="tag.order" :name="tag.order" v-for="tag in tabs">
            <component :is="tag.component" ref="tab-child" v-if="tab_name === tag.order" />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import auth from "./auth";
import visit from "./visit";
import build from "./build";
export default {
    data() {
        return {
            tab_name: "1",
            tabs: [
                { component: visit, name: "访问权限管理", order: "1" },
                { component: build, name: "制作权限管理", order: "2" },
                { component: auth, name: "角色授权管理", order: "3" }
            ]
        };
    }
};
</script>
