<template>
    <header>
        <div class="logo">
            <img src="../../images/logo.png" alt="" width="33" />
            <span>海宝安检</span>
        </div>
        <div class="header-operate">
            <div class="search">
                <i class="iconfont iconsousuo"></i>
            </div>
            <div class="meassage">
                <i class="iconfont iconxiaoxi"></i>
            </div>
            <div class="person">
                <img src="../../images/user_default.png" alt="" width="30" />
                <span>用户名</span>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
header {
    width: 100%;
    height: 48px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 30px;

    box-sizing: border-box;
    .logo {
        width: 208px;
        height: 100%;
        padding-left: 20px;
        display: flex;
        align-items: center;
        background: RGBA(28, 85, 151, 1);
    }
    .header-operate {
        display: flex;
        align-items: center;
        height: 100%;
        .meassage {
            margin: 0 16px;
        }
        .person {
            height: 100%;
            display: flex;
            align-items: center;
            img {
                margin-right: 16px;
            }
        }
    }
}
</style>
