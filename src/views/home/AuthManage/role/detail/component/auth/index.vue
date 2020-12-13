<template>
    <div class="main mgT24">
        <div
            class="operate mgB24"
            style="display: flex;
    justify-content: space-between;
}

"
        >
            <div>
                <el-form ref="form" :model="form" label-width="80px" inline label-position="left">
                    <el-form-item label="功能">
                        <el-select v-model="form.departmentName" placeholder="请选择">
                            <el-option label="全部" value="" :key="-1"></el-option>
                            <el-option :label="item.name" :value="item.name" :key="item.id" v-for="item in departmentList"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-button type="primary" @click="addRole" class="fr">新增</el-button>
            </div>
        </div>
        <el-table :data="filterVisitList">
            <el-table-column prop="sgname" label="用户名" width="150" align="center" />
            <el-table-column prop="id" label="用户编码" width="150" align="center" />
            <el-table-column prop="departmentName" label="所属部门" />
            <el-table-column label="操作" fixed="right" width="100">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="del(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <AddPerson :visible.sync="isOpenAddPerson" :onSuccess="selectUser" :selected="filterVisitList.map(item => item.id)" />
    </div>
</template>

<script>
import AddPerson from "@/components/Dialog/AddPerson";
import { department, roleDetail } from "@/model/api";

export default {
    components: {
        AddPerson
    },
    props: {
        authList: {
            type: Array
        },
        onSuccessGetList: {
            type: Function
        }
    },
    computed: {
        filterVisitList() {
            if (!this.form.departmentName) {
                return this.authList;
            } else {
                return this.authList.filter(item => item.departmentName === this.form.departmentName);
            }
        }
    },
    data() {
        return {
            isOpenAddPerson: false,
            form: {
                departmentName: ""
            },
            departmentList: []
        };
    },
    methods: {
        addRole() {
            this.isOpenAddPerson = true;
        },
        getList() {
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
                    this.departmentList = content;
                }
            });
        },
        selectUser(list) {
            const roleId = this.$route.params.roleId;
            roleDetail(
                {
                    type: "post",
                    data: {
                        enterpriseId: globalConfig.defaultInfo.APP_DEFAULT_ENTERPRISE[0],
                        userIds: list.map(item => item.userId)
                    }
                },
                `${roleId}/user`
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.onSuccessGetList && this.onSuccessGetList();
                }
            });
        },
        del(data) {
            const roleId = this.$route.params.roleId;
            this.$confirm(`此操作将删除${data.sgname}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    roleDetail(
                        {
                            type: "delete"
                        },
                        `${roleId}/user/${data.id}`
                    ).then(res => {
                        if (res.suceeded) {
                            this.onSuccessGetList && this.onSuccessGetList();
                            this.$message.success("操作成功");
                        } else {
                            res.message && this.$message.error(res.message);
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
