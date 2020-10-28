<template>
    <div class="main mgT24">
        <el-form ref="form" :model="form" label-width="80px" inline label-position="left">
            <el-form-item label="场景类型">
                <el-select v-model="form.sceneTypeId" placeholder="请选择" @change="changeType">
                    <el-option label="全部" value="" :key="-1"></el-option>

                    <el-option :label="item.name" :value="item.id" v-for="item in sceneList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="name" label="场景名称" align="center" width="180" />
            <el-table-column prop="id" label="场景编码" align="center" width="100" />

            <el-table-column prop="sceneTypeName" label="场景区域" align="center" width="100" />
            <el-table-column prop="detail" label="场景简介" align="center" />
            <el-table-column prop="locationX" label="横向位置" align="center" width="100" />
            <el-table-column prop="locationY" label="纵向位置" align="center" width="100" />
            <el-table-column label="是否公开" align="center" width="100">
                <template slot-scope="{ row }">
                    <span>{{ row.publicFlg === 1 ? "公开" : "非公开" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220" align="center">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="view(row)">
                        查看
                    </el-button>
                    <el-button type="text" @click="editScene(row)">
                        修改
                    </el-button>
                    <el-button type="text" @click="publicScene(row.id)" v-if="row.publicFlg !== 1">
                        公开场景
                    </el-button>
                    <el-button type="text" @click="unpublic(row.id)" v-if="row.publicFlg === 1">
                        取消公开场景
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
        <EditScene :sceneId="sceneId" :editData="editSceneData" :visible.sync="isOpenEditScene" :onSuccess="getList" />
        <SceneDialog :visible.sync="isOpenSceneDialog" />
    </div>
</template>

<script>
import { scene, sceneDetail, sceneType } from "@/model/api";
import EditScene from "../shippingList/Dialog/editScene";
import SceneDialog from "./Dialog/sceneDialog";
export default {
    data() {
        return {
            pagination: {
                page: 1,
                page_size: 10,
                total: 0
            },
            tableData: [],
            loading: false,
            isOpenEditScene: false,
            isOpenSceneDialog: false,
            editSceneData: {},
            sceneId: "",
            sceneList: [],
            form: {
                sceneTypeId: ""
            }
        };
    },
    components: {
        EditScene,
        SceneDialog
    },
    methods: {
        changeType() {
            this.getList();
        },
        getList() {
            this.loading = true;
            const { page, page_size } = this.pagination;
            const blockId = this.$route.params.id;
            scene({
                type: "GET",
                data: {
                    page: page,
                    size: page_size,
                    blockId,
                    status: "1",
                    sceneTypeId: this.form.sceneTypeId
                }
            }).then(res => {
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
        getSceneType() {
            const blockId = this.$route.params.id;
            sceneType({
                type: "get",
                data: {
                    blockId
                }
            }).then(res => {
                if (res.suceeded) {
                    this.sceneList = res.data.content || [];
                }
            });
        },
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
            this.getList();
        },
        unpublic(id) {
            sceneDetail(
                {
                    type: "PATCH"
                },
                `${id}/unpublic`
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.getList();
                } else {
                    this.$message.error("操作失败");
                }
            });
        },
        publicScene(id) {
            sceneDetail(
                {
                    type: "PATCH"
                },
                `${id}/public`
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.getList();
                } else {
                    this.$message.console.error();
                    ("操作失败");
                }
            });
        },
        editScene(data) {
            this.sceneId = data.id;
            this.editSceneData = data;
            this.isOpenEditScene = true;
        },
        view(data) {
            console.log(data, "data");
            this.isOpenSceneDialog = true;
        }
    },
    created() {
        this.getSceneType();
        this.getList();
    }
};
</script>
