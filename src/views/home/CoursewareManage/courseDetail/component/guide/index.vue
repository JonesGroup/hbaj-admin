<template>
    <div class="main mgT24">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="引导热点ID" align="center" width="100" />
            <el-table-column prop="code" label="引导热点编码" align="center" width="200" />
            <el-table-column prop="title" label="引导热点名称" align="center" />
            <el-table-column prop="pSceneName" label="引导热点所在场景" align="center" width="200" />
            <el-table-column label="操作" fixed="right" width="220" align="center">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="view(row)">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <Attachment :visible.sync="isOpenAttachment" :hotspotId="hotspotId" />
    </div>
</template>

<script>
import Attachment from "@/components/Attachment";
import { projectDetail } from "@/model/api";
export default {
    components: {
        Attachment
    },
    data() {
        return {
            isOpenAttachment: false,
            loading: false,
            tableData: [],
            hotspotId: ""
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
        view(data) {
            this.isOpenAttachment = true;
            this.hotspotId = data.id;
        }
    },
    created() {
        this.getList();
    }
};
</script>
