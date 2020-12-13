<template>
    <el-dialog :title="projectId ? '编辑课件' : '新增课件'" :visible="visible" width="30%" @open="open" @close="close" class="dialog-width">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="课件封面">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl && staticPath" :src="globalConfig.imagePath + form.imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="课件名称" prop="name" :rules="{ required: true, message: '必填' }">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="课件简介" prop="detail" :rules="{ required: true, message: '必填' }">
                <el-input v-model="form.detail"></el-input>
            </el-form-item>
            <div class="func">
                <el-form-item label="船舶选择" prop="blockId" :rules="{ required: true, message: '必选' }">
                    <el-select v-model="form.blockId" placeholder="请选择" @change="handleShipType">
                        <el-option :label="item.name" :value="item.id" v-for="item in shippList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="功能选择" prop="moduleId" :rules="{ required: true, message: '必选' }">
                    <el-select v-model="form.moduleId" placeholder="请选择" @change="changeFun">
                        <el-option :label="item.name" :value="item.id" v-for="item in funcList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课件分类" prop="classId" class="classId" :rules="{ required: true, message: '必选' }">
                    <el-select v-model="form.classId" placeholder="请选择">
                        <el-option :label="item.name" :value="item.id" v-for="item in moduleList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="sumbit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { project, projectDetail, projectModule, projectClass } from "@/model/api";
import store from "@/widget/store";
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onSuccess: {
            type: Function
        },
        projectId: {
            type: [String, Number],
            default: ""
        },
        editData: {
            type: Object,
            default: {}
        }
    },
    watch: {
        projectId: function(val) {
            if (val) {
                this.$nextTick(() => {
                    this.form = Object.assign(this.form, this.editData);
                    this.staticPath = this.form.imageUrl;
                });
            }
        }
    },
    data() {
        return {
            form: {
                imageUrl: globalConfig.defaultInfo.APP_DEFAULT_PROJECT_IMAGE[0],
                moduleId: "",
                classId: "",
                blockId: "",
                name: "",
                detail: "",
                oriEnterpriseId: globalConfig.defaultInfo.APP_DEFAULT_ENTERPRISE[0]
            },
            funcList: [],
            moduleList: [],
            shippList: [
                {
                    name: "散货船",
                    id: 25
                },
                {
                    name: "豪华邮轮",
                    id: 24
                },
                {
                    name: "CIC2019专项船",
                    id: 27
                }
            ],
            staticPath: "/image/PROJECT_IMAGE_default.jpg"
        };
    },
    computed: {
        uploadUrl() {
            const url = `/api/file/upload?fileName=default&relatedId=1&fileType=ENTERPRIISE_IMAGE`;
            return url;
        }
    },
    methods: {
        close() {
            this.$emit("update:visible", false);
        },
        open() {
            if (!this.projectId) {
                this.$refs.form.resetFields();
            }
            this.$nextTick(() => {
                this.form.blockId && this.getFunList();
                this.form.moduleId && this.getClassList();
            });

            // console.log("打开");
        },
        getFunList() {
            // 获取功能列表
            projectModule({
                type: "get",
                data: {
                    blockId: this.form.blockId
                }
            }).then(res => {
                if (res.suceeded) {
                    this.funcList = res.data || [];
                }
            });
        },
        getClassList() {
            projectClass({
                type: "get",
                data: {
                    moduleId: this.form.moduleId,
                    blockId: this.form.blockId
                }
            }).then(res => {
                if (res.suceeded) {
                    this.moduleList = res.data.content || [];
                }
            });
        },
        handleShipType() {
            this.form.moduleId = "";
            this.funcList = [];
            this.form.classId = "";
            this.moduleList = [];
            this.getFunList();
        },
        changeFun() {
            this.form.classId = "";
            this.moduleList = [];
            this.getClassList();
        },
        sumbit() {
            this.projectId ? this.edit() : this.save();
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    project({
                        type: "post",
                        data: this.form
                    }).then(res => {
                        if (res.suceeded) {
                            // this.addPerson(res.data.id);
                            this.onSuccess && this.onSuccess();
                            this.staticPath = "";
                            this.$refs.form.resetFields();
                            this.$message.success("操作成功");
                            this.close();
                        }
                    });
                }
            });
        },
        addPerson(projectId) {
            const userId = store.get("userId", "local");
            projectDetail(
                {
                    type: "post",
                    data: {
                        userIds: [userId],
                        managerFlg: 1
                    }
                },
                `${projectId}/user`
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                }
            });
        },
        edit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    projectDetail(
                        {
                            type: "put",
                            data: this.form
                        },
                        this.projectId
                    ).then(res => {
                        if (res.suceeded) {
                            this.onSuccess && this.onSuccess();
                            this.$refs.form.resetFields();
                            this.close();
                        }
                    });
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.staticPath = res.data.path;
            this.form.imageUrl = res.data.path;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        }
    }
};
</script>

<style lang="less">
.avatar-uploader {
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 478px;
    height: 148px;
    line-height: 148px;
    text-align: center;
}
.avatar {
    // width: 178px;
    height: 148px;
    display: block;
}
.func {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
        width: 45%;
        // float: left;
    }
    .classId {
        width: 100%;
        .el-form-item__content {
            .el-select {
                width: 100%;
            }
        }
    }
}
</style>
