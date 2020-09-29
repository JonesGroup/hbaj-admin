<template>
    <div class="main mgT24">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="detail" label="场景名称" />
            <el-table-column prop="detail" label="场景简介" />
            <el-table-column prop="detail" label="场景区域" />
            <el-table-column label="状态">
                <template slot-scope="{ row }">{{ row.value.type === "NEWS" ? "新闻" : "课件" }}</template>
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

        <AddBanner :visible.sync="isOpenAddBanner" />
    </div>
</template>

<script>
import AddBanner from "@/components/Dialog/AddBanner";
import { appConst } from "@/model/api";
export default {
    components: {
        AddBanner
    },
    data() {
        return {
            isOpenAddBanner: false,
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
                        name: "HOME_NAV_IMAGE"
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
        addBanner() {
            this.isOpenAddBanner = true;
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
