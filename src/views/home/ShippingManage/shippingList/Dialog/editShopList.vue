<template>
    <el-dialog title="更新船舶简介" :visible="visible" width="30%" @open="open" @close="close" class="dialog-width">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="船舶简介">
                <el-input v-model="form.detail" type="textarea" :rows="7" class="inputNoResize"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { blockDetail } from "@/model/api";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        detail: {
            type: String,
            default: ""
        },
        blockId: {
            type: [String, Number]
        },
        onSuccess: {
            type: Function
        }
    },
    watch: {
        detail: function(val) {
            if (val) {
                this.form.detail = val;
            }
        }
    },
    data() {
        return {
            form: {
                detail: ""
            }
        };
    },
    methods: {
        close() {
            this.$emit("update:visible", false);
        },
        open() {
            console.log("打开");
        },
        save() {
            blockDetail(
                {
                    type: "put",
                    data: {
                        detail: this.form.detail,
                        enterpriseId: "1",
                        status: "1"
                    }
                },
                this.blockId
            ).then(res => {
                this.$message.success("操作成功");
                this.onSuccess && this.onSuccess();
                this.close();
            });
        }
    }
};
</script>
