<template>
    <el-dialog
        title="添加课件共建人"
        :visible="visible"
        width="30%"
        @open="open"
        @close="close"
        class="addPerson dialog-width"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        append-to-body
    >
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="选择部门">
                <el-select v-model="form.departmentId" placeholder="请选择" @change="changeDepartment">
                    <el-option :label="item.name" :value="item.id" v-for="item in departmentList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-table ref="multipleTable" :data="userList" @selection-change="handleSelectionChange" v-if="multiple" height="350">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="userSgname" label="人员姓名"> </el-table-column>
            <!-- <el-table-column prop="name" label="部门"> </el-table-column> -->
        </el-table>

        <el-table :data="userList" highlight-current-row @current-change="handleCurrentChange" v-else height="350">
            <el-table-column prop="userSgname" label="人员姓名"> </el-table-column>
        </el-table>

        <div class="check-user-list mgT24">
            <el-tag v-for="tag in checkList" :key="tag.userSgname" closable @close="handleClose(tag)">
                {{ tag.userSgname }}
            </el-tag>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { department, departmentDetail } from "@/model/api";

export default {
    data() {
        return {
            departmentList: [],
            form: {
                departmentId: ""
            },
            userList: [],
            checkList: []
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onSuccess: {
            type: Function
        },
        multiple: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        close() {
            this.$emit("update:visible", false);
        },
        open() {
            this.getAllDeparment();
            this.getDeparmentUserList();
        },
        uniq(arr) {
            const resutl = [];
            const ids = [];
            for (let i = 0; i < arr.length; i++) {
                if (ids.indexOf(arr[i].id) === -1) {
                    ids.push(arr[i].id);
                    resutl.push(arr[i]);
                }
            }
            return resutl;
        },
        // 多选
        handleSelectionChange(val) {
            const ids = (val || []).map(item => item.id);
            this.checkList = this.userList.filter(item => ids.indexOf(item.id) !== -1);
        },
        // 单选
        handleCurrentChange(val) {
            this.checkList = [val];
        },
        handleClose(tags) {
            const id = tags.id;
            this.checkList = this.checkList.filter(item => item.id !== id);
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
                    this.departmentList = [{ name: "全部", id: "" }, ...content] || [];
                }
            });
        },
        getDeparmentUserList() {
            this.userList = [];
            departmentDetail(
                {
                    type: "get"
                },
                `${this.form.departmentId}`
            ).then(res => {
                if (res.suceeded) {
                    if (!this.form.departmentId) {
                        // 查询的是列表
                        const { content } = res.data;
                        (content || []).forEach(item => {
                            this.userList.push(...item.userList);
                        });
                    } else {
                        // 查询的是详情
                        this.userList = res.data.userList || [];
                    }
                }
            });
        },
        changeDepartment() {
            this.getDeparmentUserList();
        },
        save() {
            if (this.checkList.length === 0) {
                return this.$message.error("请选择人员");
            }
            this.close();
            this.onSuccess && this.onSuccess(this.checkList);
        }
    }
};
</script>

<style lang="less">
.addPerson {
    .el-dialog {
        // height: 600px !important;
        // overflow-y: scroll;
    }
}
.check-user-list {
    margin-top: 20px;
    .el-tag {
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
</style>
