<template>
    <el-dialog title="轮播图信息" :visible="visible" @open="open" @close="close" class="dialog-width">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="封面图片">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl && staticPath" :src="globalConfig.imagePath + form.imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-input v-model="form.detail"></el-input>
            </el-form-item>
            <el-form-item label="项目类型">
                <el-radio-group v-model="form.type">
                    <el-radio label="PROJECT">课件</el-radio>
                    <el-radio label="NEWS">咨讯</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="项目编号">
                <el-input v-model="form.aim_id"></el-input>
            </el-form-item>
            <el-form-item label="项目标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="sumbit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { appConst, appConstDetail } from "@/model/api";
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onSuccess: {
            type: Function
        },
        appConstId: {
            type: [String, Number]
        },
        editData: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            form: {
                imageUrl: "",
                type: "", // 类型
                detail: "", //项目名称
                aim_id: "", // 项目编号
                title: "" // 项目标题
            },
            staticPath: ""
        };
    },
    watch: {
        appConstId: function(val) {
            this.$nextTick(() => {
                this.form = Object.assign(this.form, this.editData.value, { detail: this.editData.detail });
                this.staticPath = this.editData.value.url;
                this.form.imageUrl = this.staticPath;
            });
        }
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
