<template>
    <div class="main mgT24">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="热点ID" />
            <el-table-column prop="code" label="热点编码" />
            <el-table-column prop="title" label="热点名称" />
            <el-table-column prop="pSceneName" label="热点所在场景" />
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { projectDetail } from "@/model/api";
export default {
    data() {
        return {
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
                `${projectId}/panoInfo`
            ).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    (res.data || []).forEach(item => {
                        if (item.hotspots) {
                            item.hotspots.forEach(k => {
                                k.pSceneName = item.name;
                                this.tableData.push(k);
                            });
                        }
                    });
                }
            });
        }
    },
    created() {
        this.getList();
    }
};
</script>
