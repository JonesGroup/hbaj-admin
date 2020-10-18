<template>
    <el-dialog title="课件审核" :visible="visible" width="30%" @open="open" @close="close">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="审核状态">
                <el-radio-group v-model="form.radio">
                    <el-radio :label="1">通过</el-radio>
                    <el-radio :label="2">不通过</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="原因" v-if="form.radio === 2">
                <el-input v-model="form.reason" type="textarea" :rows="4" class="inputNoResize"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { projectDetail } from "@/model/api";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        id: {
            type: [String, Number]
        },
        onSuccess: {
            type: Function
        }
    },
    data() {
        return {
            form: {
                radio: 1,
                reason: ""
            }
        };
    },
    methods: {
        close() {
            this.$refs.form.resetFields();
            this.$emit("update:visible", false);
        },
        open() {
            console.log("打开");
        },
        save() {
            const isPass = this.form.radio === 1;
            projectDetail(
                {
                    type: "PATCH"
                },
                `${this.id}/verify?isPass=${isPass}&reason=${this.form.reason}`
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.close();
                    this.onSuccess && this.onSuccess();
                } else {
                    this.$message.error("操作失败");
                }
            });
        }
    }
};
</script>
