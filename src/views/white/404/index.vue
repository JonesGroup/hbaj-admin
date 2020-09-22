<template>
    <div class="error-not-found">
        <h2>
            没有找到此页面，您输入的地址有误，或者您没有权限访问此地址！如有疑问请联系管理员。
        </h2>
        <router-link to="/home/HomeManage/banner">返回首页</router-link>
    </div>
</template>

<style lang="scss" scoped>
.error-not-found {
    width: 600px;
    margin: 50px auto;
    h2 {
        font-size: 16px;
        color: blue;
    }
    a {
        font-size: 14px;
        margin-top: 20px;
        color: blue;
        display: inline-block;
    }
}
</style>
