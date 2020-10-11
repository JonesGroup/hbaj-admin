<template>
    <el-dialog title="添加项目人员" :visible="visible" width="70%" @open="open" @close="close">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="detail" label="图片名称" />
            <el-table-column label="链接类别">
                <template slot-scope="{ row }">{{ row.value.type === "NEWS" ? "新闻" : "课件" }}</template>
            </el-table-column>
            <el-table-column label="项目编号">
                <template slot-scope="{ row }">{{ row.value.aim_id }}</template>
            </el-table-column>
            <el-table-column label="项目标题">
                <template slot-scope="{ row }">{{ row.value.title }}</template>
            </el-table-column>
            <el-table-column prop="url" label="项目封面" width="200">
                <template slot-scope="{ row }">
                    <img :src="globalConfig.imagePath + row.value.url" alt="" height="100" />
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="scope">
                    <el-button type="text" @click="up(tableData, scope.$index)">
                        向上
                    </el-button>
                    <el-button type="text" @click="down(tableData, scope.$index)">
                        向下
                    </el-button>
                    <el-button type="text" @click="edit(scope.row)">
                        编辑
                    </el-button>
                    <el-button type="text" @click="delBanner(scope.row.id)">
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
import { appConst, appConstDetail } from "@/model/api";

export default {
    data() {
        return {
            isOpenAddBanner: false,
            appConstId: "",
            editData: {},
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
        onSuccess: {
            type: Function
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
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
            this.getList();
        }
    }
};
</script>
