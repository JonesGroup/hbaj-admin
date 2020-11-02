<template>
    <el-dialog
        title="选择共建人员"
        :visible="visible"
        width="30%"
        @open="open"
        @close="close"
        class="addPerson dialog-width"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        append-to-body
    >
        <el-table ref="multipleTable" :data="userList" @selection-change="handleSelectionChange" v-if="multiple" height="350">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="sgname" label="人员姓名"> </el-table-column>
            <!-- <el-table-column prop="name" label="部门"> </el-table-column> -->
        </el-table>

        <el-table :data="userList" highlight-current-row @current-change="handleCurrentChange" v-else height="350">
            <el-table-column prop="sgname" label="人员姓名"> </el-table-column>
        </el-table>

        <div class="check-user-list mgT24">
            <el-tag v-for="tag in checkList" :key="tag.sgname" closable @close="handleClose(tag)">
                {{ tag.sgname }}
            </el-tag>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { department, departmentDetail, projectDetail } from "@/model/api";

export default {
    data() {
        return {
            userList: [],
            checkList: [],
            pagination: {
                page: 1,
                page_size: 10,
                total: 0
            }
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
        },
        projectId: {
            type: [String, Number]
        }
    },
    methods: {
        close() {
            this.$emit("update:visible", false);
        },
        open() {
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
            const ids = (val || []).map(item => item.userId);
            this.checkList = this.userList.filter(item => ids.indexOf(item.userId) !== -1);
        },
        // 单选
        handleCurrentChange(val) {
            this.checkList = [val];
        },
        handleClose(tags) {
            const id = tags.userId;
            this.checkList = this.checkList.filter(item => item.userId !== userId);
        },
        getDeparmentUserList() {
            this.userList = [];
            projectDetail(
                {
                    type: "get",
                    data: {
                        operation: 1
                    }
                },
                `${this.projectId}/user/validPartner/all`
            ).then(res => {
                if (res.suceeded) {
                    this.userList = res.data || [];
                }
            });
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
