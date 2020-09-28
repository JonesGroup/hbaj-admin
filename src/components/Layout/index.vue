<template>
    <div class="hban-pc">
        <Header></Header>
        <main>
            <Sidebar></Sidebar>
            <div class="container-main">
                <div class="content">
                    <HeaderBg />
                    <router-view></router-view>
                </div>
                <Footer></Footer>
            </div>
        </main>
    </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import HeaderBg from "../common/Header-BG";

export default {
    data() {
        return {};
    },
    components: {
        Header,
        Footer,
        Sidebar,
        HeaderBg
    }
};
</script>

<style lang="less">
.hban-pc {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    main {
        flex: 1; // Header组件中给了高度-高度flex
        display: flex;
        // height: 100%; // TODO:会有bug
        overflow: hidden;
        .container-main {
            flex: 1; // Sidebar中给了宽度-宽度flex
            // height: 100%;
            background: rgba(240, 242, 245, 1);
            padding: 24px 24px 0px 24px;
            display: flex;
            flex-direction: column;
            .content {
                flex: 1; // footer给了高度-高度flex
            }
        }
    }
}
</style>
