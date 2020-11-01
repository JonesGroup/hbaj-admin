<template>
    <el-dialog
        title="角色添加人员"
        :visible="visible"
        width="30%"
        @open="open"
        @close="close"
        class="addProject dialog-width"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        append-to-body
    >
        <el-form ref="form" :model="form" label-width="100px" label-position="left">
            <el-form-item label="上级部门" prop="parentId">
                <el-select v-model="form.parentId" placeholder="请选择">
                    <el-option :label="item.name" :value="item.id" v-for="item in departmentList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门负责人" prop="managerName">
                <el-input v-model="form.managerName" placeholder="请选择部门负责人" readonly @focus="openSelectUser"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
        <AddPerson :visible.sync="isOpenAddPerson" :onSuccess="selectUser" />
    </el-dialog>
</template>

<script>
import AddPerson from "@/components/Dialog/AddPerson";
import { department } from "@/model/api";

export default {
    components: {
        AddPerson
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {
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
        open() {
            this.getAllDeparment();
        },
        close() {
            this.$emit("update:visible", false);
        },
        openSelectUser() {
            this.isOpenAddPerson = true;
        },
        selectUser(list) {
            console.log(list, "list");
            this.form.managerName = list[0].userSgname;
            this.form.managerId = list[0].userId;
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
            console.log("1");
        }
    }
};
</script>
