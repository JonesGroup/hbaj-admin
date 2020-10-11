<template>
    <div class="main mgT24">
        <div class="operate mgB24">
            <el-button type="primary" @click="addBanner">导入</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="userSgname" label="用户名" />
            <el-table-column prop="detail" label="密码" />
            <el-table-column prop="userEmail" label="电子邮件" />
            <el-table-column prop="userDescription" label="个人简介" />
            <el-table-column label="头像" width="220">
                <template slot-scope="{ row }">
                    <img src="" alt="" />
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="320">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="viewMessage(row)">
                        消息管理
                    </el-button>
                    <el-button type="text" @click="viewTaskList(row)">
                        任务管理
                    </el-button>
                    <el-button type="text">
                        修改
                    </el-button>
                    <el-button type="text">
                        删除
                    </el-button>
                    <el-button type="text">
                        彻底删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <AddBanner :visible.sync="isOpenAddBanner" />
        <MessageList :visible.sync="isOpenMessageList" :userId="userId" />
        <TaskList :visible.sync="isOpenTaskList" :userId="userId" />
    </div>
</template>

<script>
import AddBanner from "@/components/Dialog/AddBanner";
import MessageList from "../../Dialog/Message";
import TaskList from "../../Dialog/TaskList";
import { departmentDetail } from "@/model/api";
export default {
    components: {
        AddBanner,
        TaskList,
        MessageList
    },
    data() {
        return {
            isOpenAddBanner: false,
            isOpenMessageList: false,
            isOpenTaskList: false,
            loading: false,
            userId: "",
            tableData: []
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
        addBanner() {
            this.isOpenAddBanner = true;
        },
        viewMessage(data) {
            this.userId = data.id;
            this.isOpenMessageList = true;
        },
        viewTaskList(data) {
            this.userId = data.id;
            this.isOpenTaskList = true;
        }
    },
    created() {
        this.getList();
    }
};
</script>
