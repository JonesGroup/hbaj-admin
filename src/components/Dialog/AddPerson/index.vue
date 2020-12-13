<template>
    <el-dialog title="选择人员" :visible="visible" width="30%" @open="open" @close="close" class="addPerson dialog-width" :close-on-click-modal="false" :modal-append-to-body="false" append-to-body>
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="选择部门">
                <el-select v-model="form.departmentId" placeholder="请选择" @change="changeDepartment">
                    <el-option :label="item.name" :value="item.id" v-for="item in departmentList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-table ref="multipleTable" :data="userList" @selection-change="handleSelectionChange" v-if="multiple" height="350" :row-key="getRowKey">
            <el-table-column type="selection" width="55" :reserve-selection="true" :selectable="checkboxT"> </el-table-column>
            <el-table-column prop="userSgname" label="人员姓名"> </el-table-column>
            <!-- <el-table-column prop="name" label="部门"> </el-table-column> -->
        </el-table>

        <el-table :data="userList" highlight-current-row @current-change="handleCurrentChange" v-else height="350">
            <el-table-column prop="userSgname" label="人员姓名"> </el-table-column>
        </el-table>
        <app-pagination
            @size-change="setPagination('page_size', $event)"
            @current-change="setPagination('page', $event)"
            :current-page="pagination.page"
            :page-sizes="[10, 20, 50]"
            :page-size="pagination.page_size"
            :total="pagination.total"
        />

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
            checkList: [],
            delUserIds: [], //被删除掉的ids
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
        selected: {
            type: Array
        }
    },
    methods: {
        checkboxT(row) {
            return !this.selected.includes(row.userId);
        },
        getRowKey(row) {
            return row.userId;
        },
        close() {
            this.$emit("update:visible", false);
        },
        open() {
            this.getAllDeparment();
        },
        // 多选
        handleSelectionChange(val) {
            this.checkList = val;
        },
        // 单选
        handleCurrentChange(val) {
            this.checkList = [val];
        },
        handleClose(tags) {
            const userId = tags.userId;
            this.checkList = this.checkList.filter(item => item.userId !== userId);
            const index = this.userList.findIndex(item => item.userId === userId);
            this.delUserIds.push(userId);
            if (index !== -1) {
                this.$refs.multipleTable.toggleRowSelection(this.userList[index], false);
            }
        },
        setSelectTabal() {
            this.$nextTick(() => {
                const Indexs = []; // 找到索引
                (this.delUserIds || []).forEach(item => {
                    const i = this.userList.findIndex(k => k.userId === item);
                    if (i !== -1) {
                        Indexs.push(i);
                    }
                });
                Indexs.forEach(item => {
                    this.$refs.multipleTable.toggleRowSelection(this.userList[item], false);
                });
            });
        },
        getAllDeparment() {
            department({
                type: "GET",
                data: {
                    page: 1,
                    size: 1000,
                    enterpriseId: globalConfig.defaultInfo.APP_DEFAULT_ENTERPRISE[0]
                }
            }).then(res => {
                if (res.suceeded) {
                    const { content } = res.data;
                    this.departmentList = content || [];
                    this.form.departmentId = this.departmentList[0].id;
                    this.getDeparmentUserList();
                }
            });
        },
        getDeparmentUserList() {
            this.userList = [];
            const { page, page_size } = this.pagination;

            departmentDetail(
                {
                    type: "get",
                    data: {
                        page,
                        size: page_size,
                        departmentId: this.form.departmentId
                    }
                },
                `${this.form.departmentId}/user`
            ).then(res => {
                if (res.suceeded) {
                    const { content, currentPage, pageSize, total } = res.data;
                    this.userList = content || [];
                    this.pagination.total = total;
                    this.pagination.page = currentPage;
                    this.pagination.page_size = pageSize;
                    this.tableData = content;
                    this.setSelectTabal();
                }
            });
        },
        changeDepartment() {
            this.pagination.page = 1;
            this.getDeparmentUserList();
        },
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
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
