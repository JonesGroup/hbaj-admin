<template>
    <div class="video-contant">
        <div class="title">
            <p>{{ title || "此内容为空" }}</p>
        </div>
        <div class="video" style="">
            <video id="videoPlayer" :src="globalConfig.imagePath + extra" ref="video" controls="controls"></video>
        </div>

        <div class="desc">
            <p>{{ content }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "测试标题",
            extra: "/static/enterprise/280/hotspot/HOTSPOT_VIDEO_280_1603014268373_default.mp4",
            content: "测试内容"
        };
    }
};
</script>

<style lang="less" scoped>
.video-contant {
    .title {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        font-size: 16px;
        padding-left: 14px;
    }
    .video {
        margin: 10px 0px;
        video {
            height: 300px;
        }
    }
}
</style>
