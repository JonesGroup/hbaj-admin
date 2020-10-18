<template>
    <el-dialog title="新增部门" :visible="visible" width="30%" @open="open" @close="close">
        <el-form ref="form" :model="form" label-width="100px" label-position="left">
            <el-form-item label="部门名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="部门负责人">
                <el-input v-model="form.name" placeholder="这是一个选择弹窗可封装"></el-input>
            </el-form-item>
            <el-form-item label="上级部门">
                <el-select v-model="form.blockId" placeholder="请选择">
                    <el-option :label="item.name" :value="item.id" v-for="item in departmentList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { department, departmentDetail } from "@/model/api";

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
            },
            departmentList: []
        };
    },
    methods: {
        close() {
            this.$refs.form.resetFields();
            this.$emit("update:visible", false);
        },
        open() {
            this.getAllDeparment();
        },
        getAllDeparment() {
            department({
                type: "GET",
                data: {
                    page: 1,
                    size: 1000,
                    enterpriseId: "1"
                }
            }).then(res => {
                if (res.suceeded) {
                    const { content } = res.data;
                    this.departmentList = content || [];
                }
            });
        },
        save() {
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
