<template>
    <div class="news-detail">
        <el-form ref="form" :model="form" label-width="80px" label-position="left" style="z-index:1000">
            <el-form-item label="">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl && staticPath" :src="globalConfig.imagePath + form.imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="form.author"></el-input>
            </el-form-item>
            <!-- <el-form-item label="机构">
                <el-input v-model="form.name"></el-input>
            </el-form-item> -->

            <el-form-item label="发布时间">
                <el-date-picker v-model="form.publishTime" type="datetime" placeholder="选择日期时间" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <div>
                <RichTextBox ref="RichTextBox" />
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer mgT24">
            <el-button @click="goback">返回</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </div>
</template>

<script>
import RichTextBox from "@/components/common/RichTextBox";
import { newsAdmin, newsAdminDetail } from "@/model/api";

export default {
    components: {
        RichTextBox
    },
    data() {
        return {
            form: {
                imageUrl: "",
                title: "", // 标题
                publishTime: "", // 发布时间
                author: "", // 作者
                contentHtml: "" //html
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
        getNewsDetail() {
            const { id } = this.$route.params;
            if (!id) {
                return;
            }
            this.loading = true;

            newsAdminDetail(
                {
                    type: "get"
                },
                id
            ).then(res => {
                this.loading = false;
                if (res.suceeded) {
                    this.setText(res.data);
                }
            });
        },
        setText(data) {
            const { author, contentHtml, imageUrl, publishTime, title } = data;
            this.form.imageUrl = imageUrl;
            this.staticPath = imageUrl;
            this.form.title = title;
            this.form.publishTime = publishTime;
            this.form.author = author;
            this.$refs.RichTextBox.setHtml(contentHtml);
        },
        save() {
            const RichTextBox = this.$refs.RichTextBox;
            const getHtml = RichTextBox.getHtml();
            this.form.contentHtml = getHtml;
            newsAdmin({
                type: "post",
                data: this.form
            }).then(res => {
                if (res.suceeded) {
                    this.$message.success("保存成功");
                }
            });
        },
        edit() {
            const RichTextBox = this.$refs.RichTextBox;
            const getHtml = RichTextBox.getHtml();
            this.form.contentHtml = getHtml;
            const id = this.$route.params.id;
            newsAdminDetail(
                {
                    type: "put",
                    data: this.form
                },
                id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("保存成功");
                }
            });
        },
        submit() {
            this.$route.params.id ? this.edit() : this.save();
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
    },
    created() {
        this.getNewsDetail();
    }
};
</script>

<style lang="less">
.news-detail {
    .el-form-item {
        z-index: 100000;
    }
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
}
</style>
