<template>
    <el-dialog title="查看任务" :visible="visible" width="70%" @open="open" @close="close">
        <el-table :data="tableData" v-loading="loading" height="450">
            <el-table-column prop="id" label="任务Id" width="70" align="center" />
            <el-table-column prop="name" label="任务名" width="200" align="center" />
            <el-table-column label="任务开始时间" width="180" align="center">
                <template slot-scope="{ row }">
                    {{ row.startDate | formaData }}
                </template>
            </el-table-column>
            <el-table-column label="任务结束时间" width="180" align="center">
                <template slot-scope="{ row }">
                    {{ row.expireDate | formaData }}
                </template>
            </el-table-column>
            <el-table-column label="类别" prop="type" width="180" align="center" />
            <el-table-column label="状态" width="100" align="center">
                <template slot-scope="{ row }">
                    {{ row.status | formTaskText }}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="50" align="center">
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
import { task, taskDetail } from "@/model/api";

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
            task({
                type: "GET",
                data: {
                    page: page,
                    userId: this.userId,
                    size: page_size
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { content, total, currentPage, pageSize } = res.data;
                    this.pagination.total = total;
                    this.pagination.page = currentPage;
                    this.pagination.page_size = pageSize;
                    this.tableData = content;
                    // console.log(this.tableData, "tabledata");
                }
            });
        },
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
            this.getList();
        },
        del(id) {
            taskDetail(
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
