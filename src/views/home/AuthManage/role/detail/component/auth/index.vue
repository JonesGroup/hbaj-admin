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
                        <el-select v-model="form.departmentName" placeholder="请选择">
                            <el-option label="全部" value="" :key="-1"></el-option>
                            <el-option :label="item.name" :value="item.name" :key="item.id" v-for="item in departmentList"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-button type="primary" @click="addRole" class="fr">新增</el-button>
            </div>
        </div>
        <el-table :data="filterVisitList">
            <el-table-column prop="sgname" label="用户名" width="150" align="center" />
            <el-table-column prop="id" label="用户编码" width="150" align="center" />
            <el-table-column prop="departmentName" label="所属部门" />
            <el-table-column label="操作" fixed="right" width="100">
                <template slot-scope="{ row }">
                    <el-button type="text">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <AddRole :visible.sync="isOpenAddRole" />
    </div>
</template>

<script>
import AddRole from "@/components/Dialog/AddRole";
import { department } from "@/model/api";

export default {
    components: {
        AddRole
    },
    props: {
        authList: {
            type: Array
        }
    },
    computed: {
        filterVisitList() {
            if (!this.form.departmentName) {
                return this.authList;
            } else {
                return this.authList.filter(item => item.departmentName === this.form.departmentName);
            }
        }
    },
    data() {
        return {
            isOpenAddRole: false,
            form: {
                departmentName: ""
            },
            departmentList: []
        };
    },
    methods: {
        addRole() {
            this.isOpenAddRole = true;
        },
        getList() {
            department({
                type: "GET",
                data: {
                    page: 1,
                    size: 1000,
                    enterpriseId: "1"
                }
            }).then(res => {
                if (res.suceeded) {
                    const { content } = res.data;
                    this.departmentList = content;
                }
            });
        }
    },
    created() {
        this.getList();
    }
};
</script>
