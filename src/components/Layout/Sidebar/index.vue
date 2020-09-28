<template>
    <div id="menu">
        <el-menu unique-opened class="el-menu-vertical" :default-active="$route.path" :router="true" :collapse="!opened">
            <sidebar-item :routers="routers" :root-path="rootPath" />
        </el-menu>
    </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { routes } from "@/router";
export default {
    data() {
        return {};
    },
    components: {
        SidebarItem
    },
    computed: {
        routers() {
            // 返回路由
            return this.routerHandler();
        },

        rootPath() {
            // 匹配路由钩子中参数
            return this.$route.matched[1].path;
        },

        asyncRouterMap() {
            // 获取路由表中的前端路由
            return routes;
        },

        layoutRouters() {
            // 找到”/“下的children模块
            return this.asyncRouterMap.find(item => item.name === "AppLayout").children;
        },

        opened() {
            // return this.$store.state.app.sidebar.opened;
            return true;
        },
        badge() {
            return this.$store.state.menuBadge.badge;
        }
    },

    methods: {
        routerHandler() {
            const routers = this.layoutRouters.find(item => item.path === this.rootPath).children;
            return routers;
        }
    }
};
</script>

<style lang="less">
@import "~@/style/theme/index.less";
#menu {
    width: 209px;
    height: 100%;
    flex-shrink: 0;
    background: @theme-bg-01;
    .el-menu {
        background: transparent !important;
        .el-submenu__title {
            color: #fff;
            i {
                color: #fff;
                padding-right: 10px;
            }
            &:hover {
                background: transparent;
            }
        }
    }
}
</style>
