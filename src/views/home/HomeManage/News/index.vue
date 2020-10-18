<template>
    <div class="main mgT24">
        <div class="operate mgB24 fr">
            <el-button type="primary" @click="addNews">新增</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="title" label="新闻标题" align="center" />
            <el-table-column prop="id" label="新闻编码" align="center" width="100" />
            <el-table-column prop="author" label="作者" align="center" width="100" />
            <el-table-column prop="institution" label="发布机构" align="center" width="100" />
            <el-table-column prop="publishTime" label="发布时间" align="center" width="180">
                <template slot-scope="{ row }">
                    <span>{{ row.publishTime | formaData }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发布状态" align="center" width="100">
                <template slot-scope="{ row }">
                    <span>{{ row.status === 1 ? "发布" : "待发布" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否置顶" align="center" width="100">
                <template slot-scope="{ row }">
                    <span>{{ row.topFlg === 1 ? "置顶" : "-" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="300" align="center">
                <template slot-scope="{ row }">
                    <el-button type="text" v-if="row.status !== 1" @click="editNews(row.id)">
                        编辑
                    </el-button>
                    <el-button type="text" v-if="row.status !== 1" @click="News(row.id, 'put', 'publish')">
                        发布
                    </el-button>
                    <el-button type="text" v-if="row.status !== 1" @click="delNews(row.id, 'delete')">
                        删除
                    </el-button>
                    <el-button type="text" v-if="row.status === 1" @click="News(row.id, 'put', 'downshelf')">
                        撤销
                    </el-button>
                    <el-button type="text" v-if="row.status === 1" @click="News(row.id, 'put', 'settop')">
                        置顶
                    </el-button>
                    <el-button type="text" v-if="row.topFlg === 1" @click="News(row.id, 'put', 'settop')">
                        取消置顶
                    </el-button>
                    <el-button type="text" @click="comment(row.id)">
                        处理评论
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
import { newsAdmin, newsAdminDetail, home } from "@/model/api";
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
        addNews() {
            this.$store.commit("SET_TIPS", "新增新闻内容");
            this.$router.push({
                path: "./news/create"
            });
        },
        editNews(id) {
            this.$store.commit("SET_TIPS", "更新新闻内容");
            this.$router.push({
                path: `./news/update/${id}`
            });
        },
        handler(newsId, type, url) {
            newsAdminDetail(
                {
                    type
                },
                `${newsId}/${url}`
            ).then(res => {
                this.$message.success("操作成功");
                this.getList();
            });
        },
        delNews(newsId, type) {
            newsAdminDetail(
                {
                    type
                },
                newsId
            ).then(res => {
                this.$message.success("操作成功");
                this.getList();
            });
        },
        News(newsId, type, url) {
            this.handler(newsId, type, url);
            if (url === "settop") {
                this.refreshAll();
            }
        },
        refreshAll() {
            home(
                {
                    type: "get"
                },
                "refreshAll"
            ).then(res => {});
        },
        comment(id = "1") {
            this.$router.push({
                path: `./news/comment/${id}`
            });
        },
        backout() {
            // 撤销
        }
    },
    created() {
        this.getList();
    }
};
</script>
