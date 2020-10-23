<template>
    <div class="main mgT24 course-list-content">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column label="课件封面" width="140" align="center" :key="Math.random()">
                <template slot-scope="{ row }" v-if="row.rel && row.rel.imageUrl">
                    <img :src="globalConfig.imagePath + row.rel.imageUrl" alt="" height="100" />
                </template>
            </el-table-column>
            <el-table-column label="课件标题" align="center" :key="Math.random()">
                <template slot-scope="{ row }" v-if="row.rel && row.rel.name">
                    <span>{{ row.rel.name }}</span>
                </template>
            </el-table-column>

            <el-table-column label="课件索引" align="center" :key="Math.random()">
                <template slot-scope="{ row }" v-if="row.rel">
                    <span>{{ `${row.rel.blockName}-${row.rel.moduleName}-${row.rel.className}-编码${row.rel.id}` }}</span>
                </template>
            </el-table-column>

            <el-table-column label="课件简介" align="center" :key="Math.random()">
                <template slot-scope="{ row }" v-if="row.rel && row.rel.detail">
                    <el-popover placement="top-start" title="" width="250" trigger="hover" :content="row.rel.detail">
                        <div class="ellipsisLineTwo" slot="reference">
                            {{ row.rel.detail }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220" align="center" :key="Math.random()">
                <template slot-scope="scope">
                    <el-button type="text" @click="downshelf(scope.row.id)">
                        撤销
                    </el-button>
                    <el-button type="text" @click="up(tableData, scope.$index)">
                        向上
                    </el-button>
                    <el-button type="text" @click="down(tableData, scope.$index)">
                        向下
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { appConst, appConstDetail, home } from "@/model/api";
export default {
    data() {
        return {
            loading: false,
            tableData: []
        };
    },
    methods: {
        getList() {
            this.loading = true;
            appConstDetail(
                {
                    type: "GET",
                    data: {
                        page: 1,
                        size: 1000
                    }
                },
                "recommendProject"
            ).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    this.tableData = res.data || [];
                    this.refreshAll();
                }
            });
        },
        refreshAll() {
            home(
                {
                    type: "get"
                },
                "refreshAll"
            ).then(res => {});
        },
        downshelf(id) {
            appConstDetail(
                {
                    type: "delete"
                },
                id
            ).then(res => {
                this.$message.success("操作成功");
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
                        name: "HOME_RECOMMEND_PROJECT"
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
        }
    },
    created() {
        this.getList();
    }
};
</script>

<style lang="less">
.course-list-content {
    table {
        .el-table__row {
            height: 125px !important;
            overflow: hidden;
        }
    }
}
</style>
