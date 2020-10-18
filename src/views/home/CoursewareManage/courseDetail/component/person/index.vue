<template>
    <div class="main mgT24">
        <div class="operate mgB24 fr">
            <el-button type="primary" @click="addBanner">新增</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="sgname" label="用户名" align="center" width="100" />
            <el-table-column prop="userId" label="用户编号" align="center" width="100" />
            <el-table-column prop="departmentName" label="所属部门" align="center" width="100" />
            <el-table-column label="是否为管理员" width="120" align="center">
                <template slot-scope="{ row }">
                    <span>{{ row.managerFlg === 0 ? "否" : "是" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="delPerson(row)" v-if="row.managerFlg === 0">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <AddPerson :visible.sync="isOpenAddPerson" :onSuccess="onSuccess" />
    </div>
</template>

<script>
import AddPerson from "@/components/Dialog/AddPerson";
import { projectDetail } from "@/model/api";
export default {
    components: {
        AddPerson
    },
    data() {
        return {
            isOpenAddPerson: false,
            loading: false,
            tableData: []
        };
    },
    methods: {
        getList() {
            const projectId = this.$route.params.id;
            this.loading = true;
            projectDetail(
                {
                    type: "GET"
                },
                projectId
            ).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    this.tableData = res.data.userList || [];
                }
            });
        },
        addBanner() {
            this.isOpenAddPerson = true;
        },
        delPerson(data) {
            const projectId = this.$route.params.id;
            const userId = data.userId;
            projectDetail(
                {
                    type: "delete"
                },
                `${projectId}/user/${userId}`
            ).then(res => {
                this.$message.success("操作成功");
                this.getList();
            });
        },
        onSuccess(list) {
            const projectId = this.$route.params.id;
            projectDetail(
                {
                    type: "post",
                    data: {
                        userIds: list.map(item => item.userId)
                    }
                },
                `${projectId}/user`
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.getList();
                }
            });
        }
    },
    created() {
        this.getList();
    }
};
</script>
