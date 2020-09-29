<template>
    <div class="main mgT24">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="value" label="课件标题" />
            <el-table-column prop="value" label="课件图片" />
            <el-table-column prop="values" label="简介" />
            <el-table-column prop="address" label="发布时间" />
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text">
                        撤销
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
import { appConst } from "@/model/api";
export default {
    data() {
        return {
            loading: false,
            tableData: [],
            pagination: {
                page: 1,
                page_size: 10,
                total: 0
            }
        };
    },
    methods: {
        getList() {
            const { page, page_size } = this.pagination;
            this.loading = true;
            appConst(
                {
                    type: "GET",
                    data: {
                        page,
                        size: page_size,
                        name: "HOME_RECOMMEND_PROJECT"
                    }
                },
                "app/pageInfo"
            ).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { content, total, currentPage, pageSize } = res.data;
                    this.pagination.total = total;
                    this.pagination.page = currentPage;
                    this.pagination.page_size = pageSize;
                    this.tableData = content.map(item => ({ ...item, value: JSON.parse(item.value) }));
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
