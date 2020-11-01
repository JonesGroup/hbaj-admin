<template>
    <el-dialog
        title="添加访问授权项目分类"
        :visible="visible"
        width="30%"
        @open="open"
        @close="close"
        class="addProject dialog-width"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        append-to-body
    >
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="选择部门">
                <el-select v-model="form.departmentId" placeholder="请选择" @change="changeDepartment">
                    <el-option :label="item.name" :value="item.id" v-for="item in departmentList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {};
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
            console.log(111);
        }
    }
};
</script>
<style lang="less"></style>
