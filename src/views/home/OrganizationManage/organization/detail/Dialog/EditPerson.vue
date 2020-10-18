<template>
    <el-dialog title="修改人员信息" :visible="visible" width="30%" @open="open" @close="close">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="用户名" prop="userSgname">
                <el-input v-model="form.userSgname"></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item> -->
            <el-form-item label="电子邮箱" prop="userEmail">
                <el-input v-model="form.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="个人简介" prop="userDescription">
                <el-input v-model="form.userDescription" type="textarea" :rows="3"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { user } from "@/model/api";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onSuccess: {
            type: Function
        },
        userId: {
            type: [String, Number]
        },
        editData: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                userSgname: "",
                userEmail: "",
                userDescription: ""
            }
        };
    },
    watch: {
        userId: function(val) {
            if (val) {
                this.$nextTick(() => {
                    this.form = Object.assign(this.form, this.editData);
                });
            }
        }
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
            const params = {
                sgname: this.form.userSgname,
                description: this.form.userDescription,
                email: this.form.userEmail
            };
            user(
                {
                    type: "put",
                    data: params
                },
                `${this.userId}/profile`
            ).then(res => {
                this.$message.success("操作成功");
                this.onSuccess && this.onSuccess();
                this.close();
            });
        }
    }
};
</script>
