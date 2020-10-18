<template>
    <div class="main mgT24">
        <div
            style="display: flex;
    justify-content: space-between;"
        >
            <div style="margin-bottom:24px">
                <el-radio-group v-model="blockId" @change="handleShipType">
                    <el-radio-button :label="25" type="primary">
                        散货船
                    </el-radio-button>
                    <el-radio-button :label="24" type="primary">
                        豪华邮轮
                    </el-radio-button>
                    <el-radio-button :label="27" type="primary">
                        CIC2019专项船
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div>
                <el-button type="primary" @click="addRole">新增</el-button>
            </div>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="序号" align="center" width="100" />
            <el-table-column prop="name" label="角色名称" align="center" />
            <el-table-column label="操作" fixed="right" width="220" align="center">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="toDetail(row)">
                        查看
                    </el-button>
                    <el-button type="text" @click="editRole(row)">
                        编辑
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
            blockId: 25,
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
                        enterpriseId: "1",
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
            const map = {
                25: "散货船",
                24: "豪华邮轮",
                27: "CIC2019专项船"
            };
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
