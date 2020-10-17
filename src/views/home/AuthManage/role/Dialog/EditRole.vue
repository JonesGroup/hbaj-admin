<template>
    <el-dialog title="更新角色名称" :visible="visible" width="30%" @open="open" @close="close">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { roleDetail } from "@/model/api";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: ""
        },
        roleId: {
            type: [String, Number]
        },
        blockId: {
            type: [String, Number]
        },
        onSuccess: {
            type: Function
        }
    },
    watch: {
        name: function(val) {
            if (val) {
                this.form.name = val;
            }
        }
    },
    data() {
        return {
            form: {
                name: "",
                enterpriseId: "1"
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
            this.form.enterpriseId = "1";
            roleDetail(
                {
                    type: "put",
                    data: {
                        name: this.form.name
                    }
                },
                this.roleId
            ).then(res => {
                this.$message.success("操作成功");
                this.onSuccess && this.onSuccess();
                this.close();
            });
        }
    }
};
</script>
