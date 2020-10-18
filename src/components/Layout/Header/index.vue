<template>
    <header>
        <div class="logo">
            <img src="../../images/logo.png" alt="" width="33" />
            <span>海宝安检</span>
        </div>
        <div class="top">
            <div class="back"><el-button type="text" @click="goBack" v-if="isBack">返回上一页</el-button></div>
            <div class="tips" style="color:#409EFF;font-size:14px;" v-if="tips && isBack">{{ tips }}</div>
            <div class="header-operate">
                <div class="search">
                    <i class="iconfont iconsousuo"></i>
                </div>
                <div class="meassage">
                    <i class="iconfont iconxiaoxi"></i>
                </div>
                <div class="person">
                    <img :src="src" alt="" width="30" />
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link"> {{ user.sgname }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="resetPassword">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>

        <ResetPassword :visible.sync="isOpenResetPasswoord" />
    </header>
</template>

<script>
import { user } from "@/model/api";
import store from "@/widget/store";
import defaultImagePath from "../../images/user_default.png";
import ResetPassword from "@/components/Dialog/ResetPassword";
export default {
    components: {
        ResetPassword
    },
    data() {
        return {
            user: {}, // 用户信息
            src: "",
            isOpenResetPasswoord: false
        };
    },
    computed: {
        isBack: function() {
            return this.$route.meta.isBack ? this.$route.meta.isBack : false;
        },
        tips: function() {
            return this.$store.state.tipsStore.tips;
        }
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
                        this.src = user.avatar ? `${globalConfig.imagePath + user.avatar}` : defaultImagePath;
                    }
                });
            }
        },
        handleCommand(command) {
            if (command === "logout") {
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("authorization");
                this.$router.push("/login");
            }
            if (command === "resetPassword") {
                this.isOpenResetPasswoord = true;
            }
        },
        goBack() {
            this.$router.go(-1);
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
    // justify-content: space-between;
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
    .top {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 15px;
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
}
</style>
