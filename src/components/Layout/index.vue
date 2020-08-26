<template>
    <div class="hban-pc">
        <Header></Header>
        <main>
            <Sidebar></Sidebar>
            <div class="container-main">
                <div class="content">
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

export default {
    data() {
        return {};
    },
    components: {
        Header,
        Footer,
        Sidebar
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
        flex: 1; // Header组件中给了高度
        display: flex;
        // height: 100%; // TODO:会有bug
        overflow: hidden;
        .container-main {
            flex: 1; // Sidebar中给了宽度
            background: rgba(240, 242, 245, 1);
            height: 100%;
        }
    }
}
</style>
