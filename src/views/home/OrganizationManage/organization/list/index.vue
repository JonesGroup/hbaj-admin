<template>
    <div class="main mgT24">
        <div class="operate mgB24 fr">
            <el-button type="primary" @click="addDepartment">新增</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="name" label="部门名称" align="center" width="120" />
            <el-table-column prop="id" label="部门编码" align="center" width="100" />

            <el-table-column prop="managerName" label="部门负责人" align="center" width="100" />
            <el-table-column label="部门人数" align="center" width="200">
                <template slot-scope="{ row }">
                    <span>{{ row.userList.length }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="parentName" label="上级部门" align="center" />

            <el-table-column label="操作" fixed="right" align="center" width="200">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="toDetail(row)">
                        查看
                    </el-button>
                    <el-button type="text" @click="edit(row)">
                        编辑
                    </el-button>
                    <el-button type="text" @click="delDepartmentId(row)">
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

        <AddDepartment :visible.sync="isOpenAddDepartment" :onSuccess="getList" :departmentId="departmentId" :editData="editData" />
    </div>
</template>

<script>
import AddDepartment from "../Dialog/AddDepartment";
import { department, departmentDetail } from "@/model/api";
export default {
    components: {
        AddDepartment
    },
    data() {
        return {
            isOpenAddDepartment: false,
            pagination: {
                page: 1,
                page_size: 10,
                total: 0
            },
            tableData: [],
            loading: false,
            departmentId: "",
            editData: {}
        };
    },
    methods: {
        getList() {
            this.loading = true;
            const { page, page_size } = this.pagination;
            department({
                type: "GET",
                data: {
                    page: page,
                    size: page_size,
                    enterpriseId: "1"
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
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
            this.getList();
        },
        toDetail(data) {
            this.$store.commit("SET_TIPS", `管理"${data.name}"部门人员`);
            this.$router.push(`./detail/${data.id}`);
        },
        delDepartmentId(data) {
            this.$confirm(`此操作将删除${data.name}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    departmentDetail(
                        {
                            type: "delete"
                        },
                        data.id
                    ).then(res => {
                        if (res.suceeded) {
                            this.$message.success("删除成功");
                            this.getList();
                        }
                    });
                })
                .catch(() => {});
        },
        edit(data) {
            this.departmentId = "";
            this.departmentId = data.id;
            this.editData = data;

            this.isOpenAddDepartment = true;
        },
        addDepartment() {
            this.departmentId = "";
            this.isOpenAddDepartment = true;
        }
    },
    created() {
        this.getList();
    }
};
</script>
