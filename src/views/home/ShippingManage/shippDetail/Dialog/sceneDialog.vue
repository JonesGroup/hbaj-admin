<template>
    <el-dialog title="查看全景" :visible="visible" width="30%" @open="open" @close="close">
        <div>这里全景场景装载</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="sumbit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { appConst, appConstDetail } from "@/model/api";
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },

    methods: {
        close() {
            this.$emit("update:visible", false);
        },
        open() {
            console.log("打开");
        },
        sumbit() {
            console.log("查看场景");
        }
    }
};
</script>
