<template>
    <div class="news-detail">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl && staticPath" :src="globalConfig.imagePath + form.imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="机构">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="发布时间">
                <el-date-picker v-model="form.value1" type="date" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
            <RichTextBox ref="RichTextBox" />
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="goback">返回</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </div>
</template>

<script>
import RichTextBox from "@/components/common/RichTextBox";

export default {
    components: {
        RichTextBox
    },
    data() {
        return {
            form: {
                name: "", // 名称
                imageUrl: "",
                radio: "",
                value1: ""
            },
            staticPath: ""
        };
    },
    computed: {
        uploadUrl() {
            const url = `/api/file/upload?fileName=default&relatedId=111&fileType=PROJECT_IMAGE`;
            return url;
        }
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        save() {
            console.log("保存");
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
    // justify-content: center;
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
