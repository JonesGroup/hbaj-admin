<template>
    <div class="main mgT24">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column label="课件标题">
                <template slot-scope="{ row }" v-if="row.value && row.value.title">
                    <span>{{ row.value.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="课件图片" width="200">
                <template slot-scope="{ row }" v-if="row.value && row.value.url">
                    <img :src="globalConfig.imagePath + row.value.url" alt="" height="100" />
                </template>
            </el-table-column>
            <el-table-column label="课件简介">
                <template slot-scope="{ row }" v-if="row.value && row.value.Detail">
                    <span>{{ row.value.Detail }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220">
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
import { appConst, appConstDetail } from "@/model/api";
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
                    const data = res.data;
                    this.tableData = data.map(item => ({ ...item, value: JSON.parse(item.value) }));
                }
            });
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
