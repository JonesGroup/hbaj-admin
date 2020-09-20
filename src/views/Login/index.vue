<template>
    <div class="login-container">
        <div class="logo-text">
            <p>海宝安检VR平台管理中心</p>
        </div>
        <div class="form">
            <div class="mobile">
                <i class="iconfont icontubiao-30"></i>
                <input type="text" placeholder="请输入手机号" />
            </div>
            <div class="password">
                <i class="iconfont icontubiao-31"></i>
                <input type="password" placeholder="请输入密码" />
            </div>
            <div class="forget">
                <span>忘记密码</span>
            </div>
            <div class="submit">
                <el-button type="primary">登录</el-button>
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
export default {
    data() {
        return {
            loading: false // 按钮状态
        };
    }
};
</script>

<style lang="less" scoped>
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
                color: rgba(24, 144, 255, 1);
            }
            input {
                margin-left: 12px;
            }
        }
        .password {
            margin-top: 24px;
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
