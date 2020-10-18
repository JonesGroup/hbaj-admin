<template>
    <el-dialog :title="departmentId ? '编辑部门' : '新增部门'" :visible="visible" width="30%" @open="open" @close="close" :close-on-click-modal="false" :modal-append-to-body="false" append-to-body>
        <el-form ref="form" :model="form" label-width="100px" label-position="left">
            <el-form-item label="部门名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="部门负责人" :rules="{ message: '请选择', required: true }" prop="managerName">
                <el-input v-model="form.managerName" placeholder="请选择部门负责人" readonly @focus="openSelectUser"></el-input>
            </el-form-item>
            <el-form-item label="上级部门" prop="parentId">
                <el-select v-model="form.parentId" placeholder="请选择">
                    <el-option :label="item.name" :value="item.id" v-for="item in departmentList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
        <AddPerson :visible.sync="isOpenAddPerson" :onSuccess="selectUser" :multiple="false" />
    </el-dialog>
</template>

<script>
import { department, departmentDetail } from "@/model/api";

import AddPerson from "@/components/Dialog/AddPerson";

export default {
    components: {
        AddPerson
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onSuccess: {
            type: Function
        },
        departmentId: {
            type: [String, Number],
            default: ""
        },
        editData: {
            type: Object,
            default: {}
        }
    },
    watch: {
        departmentId: function(val) {
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
                parentId: "",
                enterpriseId: "1",
                managerId: "",
                managerName: ""
            },
            departmentList: [],
            isOpenAddPerson: false
        };
    },
    methods: {
        openSelectUser() {
            this.isOpenAddPerson = true;
        },
        selectUser(list) {
            this.form.managerName = list[0].userSgname;
            this.form.managerId = list[0].userId;
        },
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
        submit() {
            this.departmentId ? this.edit() : this.save();
        },
        save() {
            this.form.userIds = [this.form.managerId];
            this.$refs.form.validate(valid => {
                if (valid) {
                    department({
                        type: "post",
                        data: this.form
                    }).then(res => {
                        this.$message.success("操作成功");
                        this.onSuccess && this.onSuccess();
                        this.close();
                    });
                }
            });
        },
        edit() {
            this.form.userIds = [this.form.managerId];
            this.$refs.form.validate(valid => {
                if (valid) {
                    departmentDetail(
                        {
                            type: "put",
                            data: this.form
                        },
                        this.departmentId
                    ).then(res => {
                        this.$message.success("操作成功");
                        this.onSuccess && this.onSuccess();
                        this.close();
                    });
                }
            });
        }
    }
};
</script>
