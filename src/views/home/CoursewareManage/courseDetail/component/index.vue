<template>
    <el-tabs v-model="tab_name" class="tag-container">
        <el-tab-pane :label="tag.name" :key="tag.order" :name="tag.order" v-for="tag in tabs">
            <component :is="tag.component" ref="tab-child" v-if="tab_name === tag.order" />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import attachment from "./attachment";
import guide from "./guide";
import hotspot from "./hotspot";
import person from "./person";
import scene from "./scene";
export default {
    data() {
        return {
            tab_name: "1",
            tabs: [
                { component: person, name: "人员列表", order: "1" },
                { component: scene, name: "场景列表", order: "2" },
                { component: attachment, name: "附件列表", order: "3" },
                { component: hotspot, name: "热点列表", order: "4" },
                { component: guide, name: "引导列表", order: "5" }
            ]
        };
    }
};
</script>
