<template>
    <div class="main mgT24">
        <el-table :data="tableData">
            <el-table-column label="封面" align="center" width="180">
                <template slot-scope="{ row }">
                    <img :src="globalConfig.imagePath + row.img" alt="" height="100" />
                </template>
            </el-table-column>
            <el-table-column prop="id" label="序号" width="100" align="center" />
            <el-table-column prop="name" label="应用名称" width="150" align="center" />
            <el-table-column prop="desc" label="应用简介" align="center" />
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: globalConfig.APP_DEFAULT_MODULE.map(({ id, title, Details, image }) => ({ id, name: title, desc: Details, img: image }))
        };
    }
};
</script>
