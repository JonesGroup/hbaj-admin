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

        <AddProjectPerson :visible.sync="isOpenAddPerson" :onSuccess="onSuccess" :projectId="projectId" :selecteds="tableData.map(item => item.userId)" />
    </div>
</template>

<script>
import AddProjectPerson from "@/components/Dialog/AddProjectPerson";
import { projectDetail, task, taskDetail } from "@/model/api";
export default {
    components: {
        AddProjectPerson
    },
    data() {
        return {
            isOpenAddPerson: false,
            loading: false,
            tableData: [],
            detailInfo: {} // 课件详情数据,
        };
    },
    computed: {
        projectId: function() {
            return this.$route.params.id;
        }
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
                    this.detailInfo = res.data;
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
                if (res.suceeded) {
                    task({
                        type: "get",
                        data: {
                            userId,
                            projectId
                        }
                    }).then(res => {
                        taskDetail({
                            // 需要拿到taskId进行删除
                            type: "delete",
                            data: {}
                        }).then(res => {
                            this.$message.success("操作成功");
                            this.getList();
                        });
                    });
                }
            });
        },
        onSuccess(list) {
            const projectId = this.$route.params.id;
            const userIds = list.map(item => item.userId);
            projectDetail(
                {
                    type: "post",
                    data: {
                        userIds
                    }
                },
                `${projectId}/user`
            ).then(res => {
                if (res.suceeded) {
                    this.getList();
                    this.dispatchTask(userIds);
                }
            });
        },
        dispatchTask(userIds) {
            const { blockId, createBy, currentFlg, status, name, createTime } = this.detailInfo;
            const projectId = this.$route.params.id;
            const data = {
                blockId, //模块ID
                createBy, //管理员ID
                currentFlg,
                detail: `${name}课件制作`, //项目名称+课件制作
                expireDate: createTime + 30 * 24 * 60 * 60 * 1000, //当前日期加30天
                name: `${name}课件制作`, //项目名称+课件制作
                projectId, //项目ID
                startDate: createTime, //当前日期
                type: "PROJECT_MODIFY", // PROJECT_MODIFY
                userIds
            };

            task({
                type: "post",
                data
            }).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                } else {
                    res.message && this.$message.error(res.message);
                }
            });
        }
    },
    created() {
        this.getList();
    }
};
</script>
