<template>
    <div class="main mgT24">
        <div class="operate mgB24 fr">
            <el-button type="primary" @click="addBanner">新增</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="url" label="轮播图封面" width="200" align="center">
                <template slot-scope="{ row }">
                    <img :src="globalConfig.imagePath + row.value.url" alt="" height="100" />
                </template>
            </el-table-column>
            <el-table-column prop="detail" label="封面名称" width="300" align="center" />
            <el-table-column prop="id" label="轮播图编码" width="100" align="center" />

            <el-table-column label="链接类别" width="100" align="center">
                <template slot-scope="{ row }">{{ row.value.type === "NEWS" ? "新闻" : "课件" }}</template>
            </el-table-column>
            <el-table-column label="项目编号" width="100" align="center">
                <template slot-scope="{ row }">{{ row.value.aim_id }}</template>
            </el-table-column>
            <el-table-column label="项目标题" align="center">
                <template slot-scope="{ row }">{{ row.value.title }}</template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="220" align="center">
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

        <AddBanner :visible.sync="isOpenAddBanner" :onSuccess="getList" :appConstId="appConstId" :editData="editData" />
    </div>
</template>

<script>
import AddBanner from "@/components/Dialog/AddBanner";
import { appConst, appConstDetail } from "@/model/api";
export default {
    components: {
        AddBanner
    },
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
            this.appConstId = "";
            this.isOpenAddBanner = true;
        },
        delBanner(id) {
            appConstDetail(
                {
                    type: "delete"
                },
                id
            ).then(res => {
                this.$message.success("删除成功");
                this.getList();
            });
        },
        sort() {
            const appConstIds = this.tableData.map(item => item.id);
            appConstDetail(
                {
                    type: "post",
                    data: {
                        appConstIds,
                        name: "HOME_NAV_IMAGE"
                    }
                },
                "changeSeq"
            ).then(res => {
                this.getList();
            });
        },
        up(arr, index) {
            if (arr.length > 1 && index !== 0) {
                this.newArr = this.swapItems(arr, index, index - 1);
                this.sort();
            }
        },
        down(arr, index) {
            if (arr.length > 1 && index !== arr.length - 1) {
                this.newArr = this.swapItems(arr, index, index + 1);
                this.sort();
            }
        },
        swapItems(arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
        },
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
            this.getList();
        },
        edit(data) {
            this.isOpenAddBanner = true;
            this.appConstId = data.id;
            this.editData = data;
        }
    },
    created() {
        this.getList();
    }
};
</script>
