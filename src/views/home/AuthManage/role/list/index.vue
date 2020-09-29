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
            <el-table-column prop="title" label="角色名称" />
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="toDetail(row.id)">
                        编辑
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
import { newsAdmin } from "@/model/api";
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
            newsAdmin({
                type: "GET",
                data: {
                    page: page,
                    size: page_size,
                    status: ""
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
        },
        toDetail(id) {
            this.$router.push(`./detail/1`);
        }
    },
    created() {
        this.getList();
    }
};
</script>
