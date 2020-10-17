<template>
    <el-dialog title="修改人员信息" :visible="visible" width="30%" @open="open" @close="close">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="个人简介" prop="name">
                <el-input v-model="form.name" type="textarea" :rows="3"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { roleDetail, role } from "@/model/api";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onSuccess: {
            type: Function
        }
    },
    data() {
        return {
            form: {
                name: "",
                blockId: ""
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
            role({
                type: "post",
                data: this.form
            }).then(res => {
                this.$message.success("操作成功");
                this.onSuccess && this.onSuccess();
                this.close();
            });
        }
    }
};
</script>
