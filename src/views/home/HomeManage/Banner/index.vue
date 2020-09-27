<template>
    <div class="main mgT24">
        <div class="operate mgB24">
            <el-button type="primary" @click="addBanner">添加</el-button>
        </div>
        <el-table :data="tableData">
            <el-table-column prop="date" label="序号" />
            <el-table-column prop="name" label="图片名称" />
            <el-table-column prop="address" label="链接类别" />
            <el-table-column prop="address" label="项目编号" />
            <el-table-column prop="address" label="项目链接" />
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text">
                        向上
                    </el-button>
                    <el-button type="text">
                        向下
                    </el-button>
                    <el-button type="text">
                        编辑
                    </el-button>
                    <el-button type="text">
                        发布
                    </el-button>
                    <el-button type="text">
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
        <AddBanner :visible.sync="isOpenAddBanner" />
    </div>
</template>

<script>
import AddBanner from "@/components/Dialog/AddBanner";
export default {
    components: {
        AddBanner
    },
    data() {
        return {
            isOpenAddBanner: false,
            pagination: {
                page: 1,
                page_size: 10,
                total: 0
            },
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ]
        };
    },
    methods: {
        getList() {
            console.log("111");
        },
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
            this.getList();
        },
        addBanner() {
            console.log("111");
            this.isOpenAddBanner = true;
        }
    }
};
</script>
