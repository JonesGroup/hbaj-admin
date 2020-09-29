<template>
    <div class="main mgT24">
        <div class="operate mgB24">
            <el-button type="primary" @click="addNews">添加</el-button>
        </div>
        <el-table :data="tableData">
            <el-table-column prop="id" label="序号" />
            <el-table-column prop="title" label="新闻标题" />
            <el-table-column prop="institution" label="发布机构" />
            <el-table-column prop="author" label="作者" />
            <el-table-column prop="publishTime" label="发布时间">
                <template slot-scope="{ row }">
                    <span>{{ row.publishTime | formaData }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发布状态">
                <template slot-scope="{ row }">
                    <span>{{ row.status === 1 ? "发布" : "待发布" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否置顶">
                <template slot-scope="{ row }">
                    <span>{{ row.topFlg === 1 ? "置顶" : "-" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text" v-if="row.status !== 1">
                        编辑
                    </el-button>
                    <el-button type="text" v-if="row.status !== 1">
                        发布
                    </el-button>
                    <el-button type="text" v-if="row.status !== 1">
                        删除
                    </el-button>
                    <el-button type="text" v-if="row.status === 1">
                        撤销
                    </el-button>
                    <el-button type="text" v-if="row.status === 1">
                        置顶
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
import { newsAdmin } from "@/model/api";
export default {
    data() {
        return {
            pagination: {
                page: 1,
                page_size: 10,
                total: 0
            },
            tableData: []
        };
    },
    methods: {
        getList() {
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
            this.$router.push({
                path: "./news/create"
            });
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
