<template>
    <div class="sidebar-item">
        <template v-for="item in routers">
            <!-- 存在二级菜单 -->
            <template v-if="item.children && !item.meta.hidden">
                <el-submenu :index="resolvePath(item.path)" :key="item.path">
                    <template slot="title" :style="item.meta && item.meta.style">
                        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon" class="iconfont"></i>
                        <span slot="title">{{ item.meta.title }}</span>
                    </template>
                    <sidebar-item :routers="item.children" :root-path="resolvePath(item.path)" @notice-parent="noticeParent(item)" />
                </el-submenu>
            </template>
            <!-- 不存在二级菜单 -->
            <template v-else>
                <el-menu-item :key="item.path" :index="resolvePath(item.path)" v-if="!item.meta.hidden" :style="item.meta && item.meta.style">
                    <i v-if="item.meta && item.meta.icon" :class="item.meta.icon" class="iconfont"></i>
                    <el-badge :value="item.meta.msg > 0 ? item.meta.msg : ''" class="item">
                        <span size="small">{{ item.meta.title }}</span>
                    </el-badge>
                </el-menu-item>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: "SidebarItem", // 组件名字-用在递归渲染
    data() {
        return {};
    },
    props: {
        routers: {
            // 路由数组
            type: Array,
            default() {
                return [];
            }
        },
        rootPath: {
            type: String,
            default: ""
        }
    },
    methods: {
        resolvePath(childrenPath) {
            // 生成index唯一标识
            return `${this.rootPath}/${childrenPath}`;
        }
    }
};
</script>

<style lang="less" scoped>
@import "~@/style/theme/index.less";
.sidebar-item {
    li {
        color: #fff;
        &:hover {
            background: transparent;
        }
        &.is-opened {
            ul {
                .sidebar-item {
                    background: #0e305f;
                }
            }
        }
    }
}
.el-menu-item.is-active {
    background: @theme-bg-02 !important;
}
</style>
