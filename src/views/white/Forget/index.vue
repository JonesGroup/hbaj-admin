<template>
    <div class="login-container">
        <div class="logo-text">
            <p>海宝安检VR平台管理中心</p>
        </div>
        <div class="form">
            <div class="mobile">
                <i class="iconfont icontubiao-30"></i>
                <input type="text" placeholder="请输入手机号" v-model="mobile" />
            </div>
            <div class="password code">
                <i class="iconfont icontubiao-31"></i>
                <input type="password" placeholder="请输入验证码" v-model="verifyCode" />
                <button @click="send">{{ buttonText }}</button>
            </div>
            <div class="password">
                <i class="iconfont icontubiao-31"></i>
                <input type="password" placeholder="请输入密码" v-model="password" />
            </div>
            <div class="submit">
                <el-button type="primary" @click="submit">登录</el-button>
            </div>
            <div class="tips">
                <p>海宝安检管理后台，包含船舶管理、课件管理、权限管理、 用户管理等功能</p>
            </div>
        </div>
        <div class="right">
            <p>©2019 Vr2shipping 沪ICP备18041012号用户协议</p>
        </div>
    </div>
</template>
<script>
import { user } from "@/model/api";
import validate from "@/widget/validate";
export default {
    data() {
        return {
            loading: false, // 按钮状态
            mobile: "",
            password: "",
            verifyCode: "",
            isClickCode: false,
            buttonText: "发送验证码",
            time: 60
        };
    },
    methods: {
        send() {
            const sendCode = () => {
                this.isClickCode = true;
                let times = this.time;
                this.buttonTextClone = this.buttonText;
                this.buttonText = times + "s";
                const countTimeTimer = setInterval(() => {
                    times--;
                    this.buttonText = times + "s";

                    if (times == 0) {
                        this.isClickCode = false;
                        this.buttonText = this.buttonTextClone;
                        clearInterval(countTimeTimer);
                    }
                }, 1000);
                this.countTimeTimer = countTimeTimer;
            };

            const { mobile } = this;
            if (!validate.isMobile(mobile)) {
                return this.$message.error("请输入正确的手机号");
            }
            if (this.isClickCode) {
                return false;
            }
            user({ type: "GET", data: { mobile } }, "verifyCode").then(res => {
                if (res.suceeded) {
                    sendCode();
                }
            });
        },
        submit() {
            const { mobile, verifyCode, password } = this;
            if (!validate.isMobile(mobile)) {
                return this.$message.error("请输入正确的手机号");
            }
            if (!verifyCode) {
                return this.$message.error("请输入验证码");
            }
            if (!password) {
                return this.$message.error("请输入密码");
            }
            user({ type: "POST", data: { mobile, password, verifyCode } }, "password/reset").then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.close();
                    this.$router.push({ path: "/" });
                } else {
                    res.message && this.$message.error(res.message);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "~@/style/theme/index.less";
.login-container {
    width: 100%;
    height: 100%;
    background: url("./images/login_bg.png") no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    color: #fff;
    .logo-text {
        text-align: center;
        font-size: 32px;
        font-weight: 500;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
    }
    .form {
        width: 368px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .mobile,
        .password {
            background: #fff;
            height: 40px;
            display: flex;
            align-items: center;
            padding-left: 12px;
            i {
                color: @theme-bg-01;
            }
            input {
                margin-left: 12px;
            }
        }
        .password {
            margin-top: 24px;
            &.code {
                input {
                    flex: 1;
                }
                button {
                    width: 100px;
                    height: 100%;
                    background: @theme-bg-02;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
        .forget {
            margin: 24px 0px;
            text-align: right;
            span {
                cursor: pointer;
            }
        }
        .submit {
            width: 100%;
            margin-top: 24px;
            button {
                width: 100%;
            }
        }
        .tips {
            margin-top: 24px;
            font-size: 14px;
        }
    }
    .right {
        position: absolute;
        bottom: 2%;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
