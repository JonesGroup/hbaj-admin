<template>
    <div class="text-list-container" v-loading="loading">
        <template v-if="list.length">
            <div class="text-list-item" v-for="(item, index) in list" :key="index">
                <div class="text-header">
                    <div class="text-title">
                        <span>{{ item.title }}</span>
                    </div>
                    <div class="operate_btn">
                        <div class="sort common">
                            <i class="iconfont iconpaixu cursor"></i>
                        </div>
                        <div class="edit common">
                            <i class="iconfont icontubiaoweb-07 cursor"></i>
                        </div>
                        <div class="del common">
                            <i class="iconfont icontubiaoweb-27 cursor"></i>
                        </div>
                    </div>
                </div>
                <div class="text-body">
                    <p>{{ item.content }}</p>
                </div>
            </div>
        </template>
        <Empty v-else />
    </div>
</template>
<script>
import { hotspotContent } from "@/model/api";
import Empty from "@/components/Empty";

export default {
    components: {
        Empty
    },
    data() {
        return {
            list: [],
            loading: false
        };
    },
    props: {
        hotspotId: {
            type: [String, Number],
            required: true
        }
    },
    watch: {
        // 切换的时候也需要更新
        hotspotId: function(val) {
            if (val) {
                this.getList();
            }
        }
    },
    methods: {
        getList() {
            this.loading = true;
            hotspotContent(
                {
                    type: "get",
                    data: {
                        hotspotId: this.hotspotId,
                        type: "TEXT",
                        size: 1000,
                        page: 1
                    }
                },
                "all"
            ).then(res => {
                if (res.suceeded) {
                    this.list = res.data || [];
                    this.loading = false;
                } else {
                    this.loading = false;
                }
            });
        }
    },
    mounted() {
        this.getList();
    }
};
</script>
<style lang="less" scoped>
.text-list-item {
    // height: 120px;
    border: 1px solid #eee;
    margin-bottom: 20px;
    padding: 12px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // box-shadow: 0 8px 16px 0 rgba(216, 216, 216, 1), 0 6px 20px 0 rgba(216, 216, 216, 1);
    .text-header {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .operate_btn {
            display: flex;
            .common {
                width: 18px;
                height: 18px;
                &:hover {
                    i {
                        color: #409eff;
                    }
                }
                i {
                    font-size: 18px;
                }
            }
            .edit {
                margin: 0px 10px;
            }
        }
        .text-title {
            span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
            }
        }
        .text-body {
            p {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 24px;
                color: rgba(102, 102, 102, 1);
            }
        }
    }
}
</style>
