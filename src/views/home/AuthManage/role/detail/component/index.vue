<template>
    <el-tabs v-model="tab_name" class="tag-container">
        <el-tab-pane :label="tag.name" :key="tag.order" :name="tag.order" v-for="tag in tabs">
            <component :is="tag.component" ref="tab-child" v-if="tab_name === tag.order" :visitList="visitList" :buildList="buildList" :authList="authList" :onSuccessGetList="getList" />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { roleDetail } from "@/model/api";
import auth from "./auth";
import visit from "./visit";
import build from "./build";
export default {
    data() {
        return {
            tab_name: "1",
            tabs: [
                { component: visit, name: "访问权限管理", order: "1" },
                { component: build, name: "制作权限管理", order: "2" },
                { component: auth, name: "角色授权管理", order: "3" }
            ],
            visitList: [],
            buildList: [],
            authList: []
        };
    },
    methods: {
        getList() {
            const blockId = this.$route.params.blockId;
            const roleId = this.$route.params.roleId;
            this.loading = true;
            roleDetail(
                {
                    type: "GET",
                    data: {
                        enterpriseId: "1",
                        blockId
                    }
                },
                "all"
            ).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const permission = (res.data || []).find(item => item.id.toString() === roleId);

                    if (permission.permissionList.length > 0) {
                        this.visitList = permission.permissionList.filter(item => item.operation === 0);
                        this.buildList = permission.permissionList.filter(item => item.operation === 1);
                        this.authList = permission.userList || [];
                    }
                }
            });
        }
    },
    created() {
        this.getList();
    }
};
</script>
