<template>
    <el-menu unique-opened class="el-menu-vertical" :default-active="$route.path" :router="true" :collapse="!opened">
        <sidebar-item :routers="routers" :root-path="rootPath" />
    </el-menu>
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
            console.log(this.$route.matched[1].path);
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
