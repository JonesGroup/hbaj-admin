<template>
    <el-dialog title="更新场景信息" :visible="visible" width="30%" @open="open" @close="close">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="场景名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="场景简介">
                <el-input v-model="form.detail"></el-input>
            </el-form-item>
            <el-form-item label="locationX" :rules="{ type: 'number', message: '请输入数字' }">
                <el-input v-model.number="form.locationX"></el-input>
            </el-form-item>
            <el-form-item label="locationY" :rules="{ type: 'number', message: '请输入数字' }">
                <el-input v-model.number="form.locationY"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { sceneDetail } from "@/model/api";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        sceneId: {
            type: [String, Number]
        },
        editData: {
            type: Object,
            default: function() {
                return {};
            }
        },
        onSuccess: {
            type: Function
        }
    },
    watch: {
        sceneId: function(val) {
            if (val) {
                this.$nextTick(() => {
                    this.form = Object.assign(this.form, this.editData);
                });
            }
        }
    },
    data() {
        return {
            form: {
                name: "",
                detail: "",
                locationY: "",
                locationX: ""
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
            this.$refs.form.validate(valid => {
                const { locationX, locationY, detail, name } = this.form;
                if (valid) {
                    sceneDetail(
                        {
                            type: "put",
                            data: { locationX, locationY, detail, name }
                        },
                        this.sceneId
                    ).then(res => {
                        if (res.suceeded) {
                            this.$message.success("操作成功");
                            this.onSuccess && this.onSuccess();
                            this.close();
                        } else {
                            this.$message.error("操作失败");
                        }
                    });
                }
            });
        }
    }
};
</script>
