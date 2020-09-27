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
                <img :src="src" alt="" width="30" />
                <span>{{ user.sgname }}</span>
            </div>
        </div>
    </header>
</template>

<script>
import { user } from "@/model/api";
import store from "@/widget/store";
export default {
    data() {
        return {
            user: {}, // 用户信息
            src: ""
        };
    },
    methods: {
        getUserDetail() {
            const User = store.get("user", "local");
            const userId = User.id;
            if (user) {
                user(
                    {
                        type: "get"
                    },
                    userId
                ).then(res => {
                    if (res.suceeded) {
                        this.user = res.data;
                        this.src = user.avatar ? `${globalConfig.imagePath + user.avatar}` : "/img/user_default.4dbb6ba4.png";
                    }
                });
            }
        }
    },
    mounted() {
        this.getUserDetail();
    }
};
</script>

<style lang="less" scoped>
@import "~@/style/theme/index.less";
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
        background: @theme-bg-01;
        span {
            color: #fff;
            margin-left: 16px;
        }
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
