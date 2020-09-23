<template>
    <div class="app-pagination">
        <el-pagination small background layout="->, total, sizes, prev, pager, next, jumper" :page-sizes="pageSizes" v-bind="$attrs" v-on="$listeners" />
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        pageSizes: {
            type: Array,
            default: () => {
                return [10, 20, 50, 100];
            }
        }
    }
};
</script>

<style lang="less" scoped>
.app-pagination {
    text-align: right;
    margin-top: 18px;
    & /deep/ .el-pagination {
        .el-select .el-input .el-input__inner {
            height: 22px;
        }
        .el-input--mini .el-input__icon {
            line-height: 1 !important;
        }
    }
}
</style>
