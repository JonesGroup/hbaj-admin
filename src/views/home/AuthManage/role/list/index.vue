<template>
    <div class="main mgT24">
        <div
            style="display: flex;
    justify-content: space-between;"
        >
            <div style="margin-bottom:24px">
                <el-button-group>
                    <el-button type="primary">散货船</el-button>
                    <el-button type="primary">豪华邮轮</el-button>
                    <el-button type="primary">CIC专项船</el-button>
                </el-button-group>
            </div>
            <div>
                <el-button type="primary">新增</el-button>
            </div>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="序号" />
            <el-table-column prop="name" label="角色名称" />
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="toDetail(row.id)">
                        查看
                    </el-button>
                    <el-button type="text" @click="editRole(row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <EditRole :visible.sync="isOpenRole" :roleId="roleId" :blockId="blockId" :name="name" :onSuccess="getList" />
    </div>
</template>

<script>
import { roleDetail } from "@/model/api";
import EditRole from "../Dialog/EditRole";
export default {
    components: {
        EditRole
    },
    data() {
        return {
            tableData: [],
            loading: false,
            isOpenRole: false,
            roleId: "",
            blockId: "",
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
                        blockId: "25"
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
        toDetail(id) {
            this.$router.push(`./detail/1`);
        },
        editRole(data) {
            this.name = data.name;
            this.roleId = data.id;
            this.blockId = "25";
            this.isOpenRole = true;
        }
    },
    setPagination(p, v) {
        this.$set(this.pagination, p, v);
        this.getList();
    },
    created() {
        this.getList();
    }
};
</script>
