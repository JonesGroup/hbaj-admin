<template>
    <el-tabs v-model="defaultTabName" class="tag-container">
        <el-tab-pane :label="tag.name" :key="tag.order" :name="tag.order" v-for="tag in Tabs">
            <component :is="tag.component" ref="tab-child" v-if="defaultTabName === tag.order" :hotspotId="hotspotId" />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import ImagesList from "./ImagesList";
import TextList from "./TextList";
export default {
    props: {
        hotspotId: {
            type: [String, Number],
            required: true
        },
        orderList: {
            type: Array,
            default: () => ["文本", "图片", "音频", "视频", "富文本"]
        }
    },
    data() {
        return {
            defaultTabName: "1",
            tabs: [
                { component: TextList, name: "文本", order: "1" },
                { component: ImagesList, name: "图片", order: "2" }
            ]
        };
    },
    computed: {
        Tabs() {
            // 计算tabs顺序
            const tabs = [];
            this.orderList.forEach(item => {
                this.tabs.forEach(k => {
                    if (item === k.name) {
                        tabs.push(k);
                    }
                });
            });
            this.defaultTabName = tabs[0].order;
            return tabs;
        }
    }
};
</script>
