<template>
    <div class="main mgT24">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="name" label="船名" width="150" align="center" />
            <el-table-column prop="id" label="船舶编码" width="100" align="center" />

            <el-table-column prop="detail" label="船舶简介" align="center" />
            <el-table-column label="操作" fixed="right" width="300" align="center">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="toShipDetail(row.id, row)">
                        查看场景资源
                    </el-button>
                    <el-button type="text" @click="editDetail(row)">
                        编辑船舶简介
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
        toShipDetail(id, data) {
            this.$store.commit("SET_TIPS", `查看${data.name}场景资源`);
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
