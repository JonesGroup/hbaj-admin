<template>
    <div class="main mgT24">
        <div class="operate mgB24">
            <el-button type="primary" @click="addBanner">导入</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="id" label="用户名" />
            <el-table-column prop="detail" label="密码" />
            <el-table-column prop="detail" label="电子邮件" />
            <el-table-column prop="detail" label="个人简介" />
            <el-table-column label="头像" width="220">
                <template slot-scope="{ row }">
                    <img src="" alt="" />
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="320">
                <template slot-scope="{ row }">
                    <el-button type="text">
                        消息管理
                    </el-button>
                    <el-button type="text">
                        任务管理
                    </el-button>
                    <el-button type="text">
                        修改
                    </el-button>
                    <el-button type="text">
                        删除
                    </el-button>
                    <el-button type="text">
                        彻底删除
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
