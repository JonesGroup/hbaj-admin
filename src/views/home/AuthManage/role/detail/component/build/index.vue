<template>
    <div class="main mgT24">
        <div
            class="operate mgB24"
            style="display: flex;
    justify-content: space-between;
}

"
        >
            <div>
                <el-form ref="form" :model="form" label-width="80px" inline label-position="left">
                    <el-form-item label="功能">
                        <el-select v-model="form.moduleName" placeholder="请选择">
                            <el-option label="全部" value="" :key="-1"></el-option>
                            <el-option :label="item.name" :value="item.name" v-for="item in list" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-button type="primary" @click="addProject" class="fr">新增</el-button>
            </div>
        </div>
        <el-table :data="filterVisitList">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="moduleName" label="项目分类名称" />
            <el-table-column prop="className" label="功能分类名称" />
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="del(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <AddProject :visible.sync="isOpenAddProject" :onSuccess="onSuccess" :roleId="roleId" :operation="1" />
    </div>
</template>

<script>
import AddProject from "@/components/Dialog/AddProject";
import { roleDetail } from "@/model/api";

export default {
    components: {
        AddProject
    },
    props: {
        buildList: {
            type: Array
        },
        onSuccessGetList: {
            type: Function
        }
    },
    computed: {
        filterVisitList() {
            if (!this.form.moduleName) {
                return this.buildList;
            } else {
                return this.buildList.filter(item => item.moduleName === this.form.moduleName);
            }
        },
        roleId() {
            return this.$route.params.roleId;
        }
    },
    data() {
        return {
            isOpenAddProject: false,
            form: {
                moduleName: ""
            },
            list: globalConfig.APP_DEFAULT_MODULE.map(({ id, title, Details, image }) => ({ id, name: title, desc: Details, img: image }))
        };
    },
    methods: {
        addProject() {
            this.isOpenAddProject = true;
        },
        onSuccess() {
            this.onSuccessGetList && this.onSuccessGetList();
        },
        del(data) {
            this.$confirm(`此操作将删除${data.className}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    roleDetail(
                        {
                            type: "delete"
                        },
                        `${this.roleId}/permission/${data.id}`
                    ).then(res => {
                        if (res.suceeded) {
                            this.onSuccessGetList && this.onSuccessGetList();
                            this.$message.success("操作成功");
                        } else {
                            res.message && this.$message.error(res.message);
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>
