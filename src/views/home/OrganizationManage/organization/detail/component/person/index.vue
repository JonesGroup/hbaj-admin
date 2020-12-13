<template>
    <div class="main mgT24">
        <div class="operate mgB24 fr">
            <el-button type="primary" @click="importPerson">导入</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="ID" width="100" align="center" />
            <el-table-column prop="userSgname" label="用户名" width="100" align="center" />
            <!-- <el-table-column prop="detail" label="密码" /> -->
            <el-table-column prop="userEmail" label="电子邮件" width="180" align="center" />
            <el-table-column prop="userDescription" label="个人简介" align="center" />
            <!-- <el-table-column label="头像" width="220">
                <template slot-scope="{ row }">
                    <img src="" alt="" />
                </template>
            </el-table-column> -->
            <el-table-column label="操作" fixed="right" width="320">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="viewMessage(row)">
                        消息管理
                    </el-button>
                    <el-button type="text" @click="viewTaskList(row)">
                        任务管理
                    </el-button>
                    <el-button type="text" @click="editPerson(row)">
                        修改
                    </el-button>
                    <el-button type="text" @click="delPerson(row)">
                        删除
                    </el-button>
                    <el-button type="text">
                        彻底删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <MessageList :visible.sync="isOpenMessageList" :userId="userId" />
        <AddPerson :visible.sync="isOpenAddPerson" :onSuccess="selectUser" :selected="tableData.map(item => item.userId)" />
        <TaskList :visible.sync="isOpenTaskList" :userId="userId" />
        <EditPerson :visible.sync="isOpenEditPerson" :userId="userId" :editData="editData" :onSuccess="getList" />
    </div>
</template>

<script>
import AddPerson from "@/components/Dialog/AddPerson";
import MessageList from "../../Dialog/Message";
import TaskList from "../../Dialog/TaskList";
import EditPerson from "../../Dialog/EditPerson";
import { departmentDetail } from "@/model/api";
export default {
    components: {
        AddPerson,
        TaskList,
        MessageList,
        EditPerson
    },
    data() {
        return {
            isOpenAddPerson: false,
            isOpenMessageList: false,
            isOpenTaskList: false,
            isOpenEditPerson: false,
            loading: false,
            userId: "",
            tableData: [],
            editData: {}
        };
    },
    methods: {
        getList() {
            const id = this.$route.params.id;
            this.loading = true;
            departmentDetail(
                {
                    type: "GET"
                },
                id
            ).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { userList } = res.data;
                    this.tableData = userList || [];
                }
            });
        },
        importPerson() {
            this.isOpenAddPerson = true;
        },
        selectUser(list) {
            const departmentId = this.$route.params.id;
            departmentDetail(
                {
                    type: "post",
                    data: {
                        enterpriseId: globalConfig.defaultInfo.APP_DEFAULT_ENTERPRISE[0],
                        userIds: list.map(item => item.userId)
                    }
                },
                `${departmentId}/user`
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.getList();
                }
            });
        },
        viewMessage(data) {
            this.userId = data.userId;
            this.isOpenMessageList = true;
        },
        viewTaskList(data) {
            this.userId = data.userId;
            this.isOpenTaskList = true;
        },
        editPerson(data) {
            this.userId = "";
            this.userId = data.userId;
            this.editData = data;
            this.isOpenEditPerson = true;
        },
        delPerson(data) {
            const departmentId = this.$route.params.id;
            const userId = data.userId;
            this.$confirm(`此操作将删除${data.userSgname}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    departmentDetail(
                        {
                            type: "delete"
                        },
                        `${departmentId}/user/${userId}`
                    ).then(res => {
                        if (res.suceeded) {
                            // 删除成功后加入待定组
                            departmentDetail(
                                {
                                    type: "post",
                                    data: {
                                        enterpriseId: globalConfig.defaultInfo.APP_DEFAULT_ENTERPRISE[0],
                                        userIds: [userId]
                                    }
                                },
                                `40/user`
                            ).then(res => {
                                if (res.suceeded) {
                                    this.$message.success("操作成功");
                                    this.getList();
                                }
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    },
    created() {
        this.getList();
    }
};
</script>
