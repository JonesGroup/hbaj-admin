<template>
    <el-dialog
        :title="`添加${operation === 0 ? '访问授权' : '制作权限'}项目分类`"
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
            <el-form-item label="功能">
                <el-select v-model="form.moduleId" placeholder="请选择" @change="changeFun">
                    <el-option :label="item.name" :value="item.id" v-for="item in funcList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课件分类">
                <el-select v-model="form.classId" placeholder="请选择" multiple collapse-tags>
                    <el-option :label="item.name" :value="item.id" v-for="item in moduleList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { projectModule, projectClass, roleDetail } from "@/model/api";

export default {
    data() {
        return {
            funcList: [],
            moduleList: [],
            form: {
                moduleId: "",
                classId: [],
                status: ""
            }
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onSuccess: {
            type: Function
        },
        roleId: {
            type: [String, Number]
        },
        operation: {
            // 0 访问权限 1制作权限
            type: Number
        }
    },
    methods: {
        close() {
            this.$emit("update:visible", false);
        },
        open() {
            this.getFunList();
        },
        getFunList() {
            const blockId = this.$route.params.blockId;
            // 获取功能列表
            projectModule({
                type: "get",
                data: {
                    blockId
                }
            }).then(res => {
                if (res.suceeded) {
                    this.funcList = res.data || [];
                }
            });
        },
        changeFun() {
            this.getClassList();
            this.form.classId = [];
            // this.getList();
        },
        getClassList() {
            const blockId = this.$route.params.blockId;
            projectClass({
                type: "get",
                data: {
                    moduleId: this.form.moduleId,
                    blockId
                }
            }).then(res => {
                if (res.suceeded) {
                    this.moduleList = this.moduleList.concat(res.data.content || []);
                }
            });
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    roleDetail(
                        {
                            type: "post",
                            data: {
                                classIds: this.form.classId,
                                operation: this.operation
                            }
                        },
                        `${this.roleId}/permission`
                    ).then(res => {
                        if (res.suceeded) {
                            this.onSuccess && this.onSuccess();
                            this.$message.success("操作成功");
                            this.close();
                        }
                    });
                }
            });
        }
    }
};
</script>
<style lang="less"></style>
