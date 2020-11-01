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
                            <el-option label="技术解读" value="技术解读" :key="1"></el-option>
                            <el-option label="专业英语" value="专业英语" :key="2"></el-option>
                            <el-option label="模拟训练" value="模拟训练" :key="3"></el-option>
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
                    <el-button type="text">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <AddProject :visible.sync="isOpenAddProject" />
    </div>
</template>

<script>
import AddProject from "@/components/Dialog/AddProject";
export default {
    components: {
        AddProject
    },
    props: {
        buildList: {
            type: Array
        }
    },
    computed: {
        filterVisitList() {
            if (!this.form.moduleName) {
                return this.buildList;
            } else {
                return this.buildList.filter(item => item.moduleName === this.form.moduleName);
            }
        }
    },
    data() {
        return {
            isOpenAddProject: false,
            form: {
                moduleName: ""
            }
        };
    },
    methods: {
        addProject() {
            this.isOpenAddProject = true;
        }
    }
};
</script>
