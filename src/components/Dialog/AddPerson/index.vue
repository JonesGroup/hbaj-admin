<template>
    <el-dialog title="添加项目人员" :visible="visible" width="30%" @open="open" @close="close">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip> </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            multipleSelection: [],
            tableData: [
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-08",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-06",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-07",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ]
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onSuccess: {
            type: Function
        }
    },
    methods: {
        close() {
            this.$emit("update:visible", false);
        },
        open() {
            console.log("打开");
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        }
    }
};
</script>
