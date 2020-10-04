<template>
    <div class="main mgT24">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="热点ID" />
            <el-table-column prop="code" label="热点编码" />
            <el-table-column prop="title" label="热点名称" />
            <el-table-column prop="sceneId" label="热点所在场景" />
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <AddBanner :visible.sync="isOpenAddBanner" />
    </div>
</template>

<script>
import AddBanner from "@/components/Dialog/AddBanner";
import { projectDetail } from "@/model/api";
export default {
    components: {
        AddBanner
    },
    data() {
        return {
            isOpenAddBanner: false,
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
                    this.tableData = res.data.guidances || [];
                }
            });
        },
        addBanner() {
            this.isOpenAddBanner = true;
        }
    },
    created() {
        this.getList();
    }
};
</script>
