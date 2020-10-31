<template>
    <div class="audio-contant">
        <div class="title">
            <p>{{ title || "此内容为空" }}</p>
        </div>
        <div class="audio" style="">
            <audio id="audioPlayer" :src="globalConfig.imagePath + extra" controlsList="nodownload" controls="controls" ref="audio"></audio>
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
            extra: "/static/enterprise/280/hotspot/HOTSPOT_AUDIO_280_1603014259074_default.mp3",
            content: "测试内容"
        };
    }
};
</script>

<style lang="less" scoped>
.audio-contant {
    .title {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        font-size: 16px;
        padding-left: 14px;
    }
    .audio {
        margin: 10px 0px;
    }
}
</style>
