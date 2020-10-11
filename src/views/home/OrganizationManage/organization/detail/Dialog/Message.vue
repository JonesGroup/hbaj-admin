<template>
    <el-dialog title="查看消息" :visible="visible" width="70%" @open="open" @close="close">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="Id" />
            <el-table-column prop="title" label="消息标题" />
            <el-table-column prop="content" label="详细内容" />
            <el-table-column label="消息状态">
                <template slot-scope="{ row }">
                    {{ row.status === 0 ? "未读" : "已读" }}
                </template>
            </el-table-column>
            <el-table-column label="消息类别">
                <template slot-scope="{ row }">
                    {{ row.messageType | formMessageText }}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="del(row.id)">
                        删除
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
    </el-dialog>
</template>

<script>
import { messageDetail } from "@/model/api";

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
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        userId: {
            type: [String, Number]
        }
    },
    methods: {
        close() {
            this.$emit("update:visible", false);
        },
        open() {
            this.getList();
        },
        getList() {
            const { page, page_size } = this.pagination;
            this.loading = true;
            messageDetail(
                {
                    type: "get",
                    data: {
                        page,
                        size: page_size,
                        receiver: this.userId
                    }
                },
                "private"
            ).then(res => {
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
        del(id) {
            messageDetail(
                {
                    type: "delete"
                },
                id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("删除成功");
                    this.getList();
                }
            });
        }
    }
};
</script>
