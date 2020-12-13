<template>
    <el-dialog title="查看全景" :visible="visible" width="85%" @open="open" @close="close" append-to-body class="addAudiodialog" top="0vh">
        <div id="p_editor" style="width:100%;" :style="{ height: Height }"></div>
    </el-dialog>
</template>

<script>
import { appConst, appConstDetail } from "@/model/api";
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        sid: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {};
    },
    watch: {
        sid(value) {
            if (value) {
                this.initPano();
            }
        }
    },
    computed: {
        Height() {
            return document.body.clientHeight * 0.85 + "px";
        }
    },

    methods: {
        initPano() {
            if (this.sid) {
                this.$nextTick(() => {
                    embedpano({
                        id: "kr",
                        swf: "/pano/tour.swf",
                        xml: `/pano/main_m.xml`,
                        target: "p_editor",
                        html5: "prefer",
                        passQueryParameters: true,
                        onready: getSceneData(this.sid)
                    });
                });
            }
        },
        close() {
            this.$emit("update:visible", false);
        },
        sumbit() {
            console.log("查看场景");
        }
    }
};
</script>

<style lang="less" scoped>
.addAudiodialog {
    /deep/ .el-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .el-dialog__body {
            padding: 0;
        }
    }
}
</style>
