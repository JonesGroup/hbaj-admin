<template>
    <div class="main mgT24">
        <div
            style="display: flex;
    justify-content: space-between;"
        >
            <div style="margin-bottom:24px">
                <el-radio-group v-model="blockId" @change="handleShipType">
                    <el-radio-button :label="item.id" type="primary" v-for="item in blockList" :key="item.id">
                        {{ item.name }}
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div>
                <el-button type="primary" @click="addRole">新增</el-button>
            </div>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="name" label="角色名称" align="center" />
            <el-table-column prop="id" label="角色编码" align="center" width="200" />
            <el-table-column label="用户数量" align="center" width="200">
                <template slot-scope="{ row }">
                    {{ row.userList.length }}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="320" align="center">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="toDetail(row)">
                        查看角色授权
                    </el-button>
                    <el-button type="text" @click="editRole(row)">
                        编辑角色名称
                    </el-button>
                    <el-button type="text" @click="delRole(row)">
                        删除角色
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <EditRole :visible.sync="isOpenRole" :roleId="roleId" :blockId="blockId" :name="name" :onSuccess="getList" />

        <AddRole :visible.sync="isOpenAddRole" :onSuccess="getList" />
    </div>
</template>

<script>
import { roleDetail } from "@/model/api";
import EditRole from "../Dialog/EditRole";
import AddRole from "../Dialog/AddRole";
export default {
    components: {
        EditRole,
        AddRole
    },
    data() {
        return {
            tableData: [],
            loading: false,
            isOpenRole: false,
            isOpenAddRole: false,
            roleId: "",
            blockId: globalConfig.defaultBlocks[0].id,
            blockList: globalConfig.defaultBlocks,
            name: ""
        };
    },
    methods: {
        getList() {
            this.loading = true;
            roleDetail(
                {
                    type: "GET",
                    data: {
                        enterpriseId: globalConfig.defaultInfo.APP_DEFAULT_ENTERPRISE[0],
                        blockId: this.blockId
                    }
                },
                "all"
            ).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    this.tableData = res.data;
                }
            });
        },
        toDetail(data) {
            const map = {};
            globalConfig.defaultBlocks.forEach(item => {
                map[item.id] = item.name;
            });
            this.$store.commit("SET_TIPS", `对"${map[this.blockId]}"的"${data.name}"角色进行授权管理`);
            this.$router.push(`./detail/${this.blockId}/${data.id}`);
        },
        editRole(data) {
            this.name = data.name;
            this.roleId = data.id;
            this.blockId = this.blockId;
            this.isOpenRole = true;
        },
        addRole() {
            this.isOpenAddRole = true;
        },
        delRole(data) {
            this.$confirm(`此操作将删除${data.name}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    roleDetail(
                        {
                            type: "delete"
                        },
                        data.id
                    ).then(res => {
                        if (res.suceeded) {
                            this.$message.success("删除成功");
                            this.getList();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
            this.getList();
        },
        handleShipType() {
            this.getList();
        }
    },

    created() {
        this.getList();
    }
};
</script>
