<template>
    <el-dialog title="附件资源" :visible="visible" width="50%" @open="open" @close="close">
        <Components :hotspotId="hotspotId" :orderList="orderList" />
    </el-dialog>
</template>

<script>
import Components from "./components";
export default {
    components: {
        Components
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        hotspotId: {
            type: [String, Number],
            required: true
        },
        orderList: {
            type: Array
        }
    },
    data() {
        return {};
    },
    methods: {
        open() {},
        close() {
            this.$emit("update:visible", false);
        }
    }
};
</script>
