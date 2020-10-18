<template>
    <div class="main mgT24">
        <el-table :data="tableData">
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
            tableData: [
                {
                    id: 1,
                    name: "技术解读",
                    desc: "这是一个简介"
                },
                {
                    id: 2,
                    name: "专业英语",
                    desc: "这是一个简介2"
                },
                {
                    id: 3,
                    name: "模拟训练",
                    desc: "这是一个简介3"
                }
            ]
        };
    }
};
</script>
