<template>
    <el-dialog title="附件资源" :visible="visible" width="50%" @open="open" @close="close" lock-scroll top="0vh">
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
<style lang="less" scoped>
/deep/ .el-dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
