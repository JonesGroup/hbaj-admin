<template>
    <div class="main mgT24">
        <div class="operate mgB24">
            <el-button type="primary" @click="addBanner">添加</el-button>
        </div>
        <el-table :data="buildList">
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

        <AddBanner :visible.sync="isOpenAddBanner" />
    </div>
</template>

<script>
import AddBanner from "@/components/Dialog/AddBanner";
export default {
    components: {
        AddBanner
    },
    props: {
        buildList: {
            type: Array
        }
    },
    data() {
        return {
            isOpenAddBanner: false
        };
    },
    methods: {
        addBanner() {
            this.isOpenAddBanner = true;
        }
    }
};
</script>
