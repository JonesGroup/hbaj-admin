<template>
    <el-dialog title="新增项目" :visible="visible" width="30%" @open="open" @close="close">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl && staticPath" :src="globalConfig.imagePath + form.imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model="form.detail"></el-input>
            </el-form-item>
            <el-form-item label="项目简介">
                <el-input v-model="form.detail"></el-input>
            </el-form-item>
            <el-form-item label="船只">
                <el-select v-model="form.blockId" placeholder="请选择" @change="handleShipType">
                    <el-option :label="item.name" :value="item.id" v-for="item in shippList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="功能">
                <el-select v-model="form.moduleId" placeholder="请选择" @change="changeFun">
                    <el-option :label="item.name" :value="item.id" v-for="item in funcList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目分类">
                <el-select v-model="form.classId" placeholder="请选择" @change="changeClass">
                    <el-option :label="item.name" :value="item.id" v-for="item in moduleList" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="sumbit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { project, projectDetail, projectModule, projectClass } from "@/model/api";
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onSuccess: {
            type: Function
        }
    },
    data() {
        return {
            form: {
                imageUrl: "",
                moduleId: "",
                classId: "",
                blockId: ""
            },
            funcList: [],
            moduleList: [],
            shippList: [
                {
                    name: "散货船",
                    id: "25"
                },
                {
                    name: "豪华邮轮",
                    id: "24"
                },
                {
                    name: "CIC专项船",
                    id: "27"
                }
            ],
            staticPath: ""
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
            this.$refs.form.resetFields();
            this.$emit("update:visible", false);
        },
        open() {
            console.log("打开");
        },
        fomatParams() {
            this.form.url = this.form.imageUrl;
            const { type, aim_id, title, url } = this.form;
            const data = {
                name: "HOME_NAV_IMAGE",
                detail: this.form.detail,
                value: JSON.stringify({ type, aim_id, title, url })
            };
            return data;
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
            this.appConstId ? this.edit() : this.save();
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const data = this.fomatParams();
                    appConst({
                        type: "post",
                        data
                    }).then(res => {
                        if (res.suceeded) {
                            this.$message.success("新增成功");
                            this.onSuccess && this.onSuccess();
                            this.close();
                        }
                    });
                }
            });
        },
        edit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const data = this.fomatParams();
                    appConstDetail(
                        {
                            type: "put",
                            data
                        },
                        this.appConstId
                    ).then(res => {
                        if (res.suceeded) {
                            this.$message.success("修改成功");
                            this.onSuccess && this.onSuccess();
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
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    // width: 178px;
    height: 178px;
    display: block;
}
</style>
