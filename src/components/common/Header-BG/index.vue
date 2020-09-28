<template>
    <div class="header-bg-container" v-if="isShowBg">
        <div class="bg"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        isShowBg: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="less" scoped>
.header-bg-container {
    .bg {
        width: 100%;
        height: 188px;
        background: url("../images/header-bg.png") no-repeat;
        background-size: 100%;
        background-position: center;
        max-height: 188px;
    }
}
</style>
