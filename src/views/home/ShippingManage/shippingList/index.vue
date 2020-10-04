<template>
    <div class="main mgT24">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="序号" />
            <el-table-column prop="name" label="船名" />
            <el-table-column prop="detail" label="船舶简介" />
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="toShipDetail(row.id)">
                        查看资源
                    </el-button>
                    <el-button type="text" @click="editDetail(row)">
                        编辑简介
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <EditShopList :visible.sync="isOpenEditShopList" :detail="detail" :blockId="blockId" :onSuccess="getList" />
    </div>
</template>

<script>
import { block } from "@/model/api";
import EditShopList from "./Dialog/editShopList.vue";
export default {
    data() {
        return {
            tableData: [],
            loading: false,
            isOpenEditShopList: false,
            detail: "",
            blockId: ""
        };
    },
    components: {
        EditShopList
    },
    methods: {
        getList() {
            this.loading = true;
            block({
                type: "GET",
                data: {
                    // page: page,
                    // size: page_size,
                    enterpriseId: "1",
                    status: "1"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { data } = res;
                    this.tableData = data;
                }
            });
        },
        toShipDetail(id) {
            this.$router.push(`./shippDetail/${id}`);
        },
        editDetail(data) {
            this.detail = data.detail;
            this.blockId = data.id;
            this.isOpenEditShopList = true;
        }
    },

    created() {
        this.getList();
    }
};
</script>
