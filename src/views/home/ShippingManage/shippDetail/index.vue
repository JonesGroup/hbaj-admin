<template>
    <div class="main mgT24">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="序号" />
            <el-table-column prop="name" label="场景名称" />
            <el-table-column prop="sceneTypeId" label="场景区域" />
            <el-table-column prop="detail" label="场景简介" />
            <el-table-column label="是否公开">
                <template slot-scope="{ row }">
                    <span>{{ row.publicFlg === 1 ? "公开" : "非公开" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text">
                        查看
                    </el-button>
                    <el-button type="text">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <app-pagination
            @size-change="setPagination('page_size', $event)"
            @current-change="setPagination('page', $event)"
            :current-page="pagination.page"
            :page-sizes="[10, 20, 50]"
            :page-size="pagination.page_size"
            :total="pagination.total"
        />
    </div>
</template>

<script>
import { scene } from "@/model/api";
export default {
    data() {
        return {
            pagination: {
                page: 1,
                page_size: 10,
                total: 0
            },
            tableData: [],
            loading: false
        };
    },
    methods: {
        getList() {
            this.loading = true;
            const { page, page_size } = this.pagination;
            const blockId = this.$route.params.id;
            scene({
                type: "GET",
                data: {
                    page: page,
                    size: page_size,
                    blockId,
                    status: "1"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { content, total, currentPage, pageSize } = res.data;
                    this.pagination.total = total;
                    this.pagination.page = currentPage;
                    this.pagination.page_size = pageSize;
                    this.tableData = content;
                }
            });
        },
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
            this.getList();
        }
    },
    created() {
        this.getList();
    }
};
</script>
