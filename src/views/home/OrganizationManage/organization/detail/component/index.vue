<template>
    <el-tabs v-model="tab_name" class="tag-container">
        <el-tab-pane :label="tag.name" :key="tag.order" :name="tag.order" v-for="tag in tabs">
            <component :is="tag.component" ref="tab-child" v-if="tab_name === tag.order" />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import person from "./person";
export default {
    data() {
        return {
            tab_name: "1",
            tabs: [{ component: person, name: "人员管理", order: "1" }]
        };
    }
};
</script>
