<template>
    <div class="images-list-containter" v-loading="loading">
        <template v-if="list.length">
            <div class="images-list-item" v-for="(item, index) in list" :key="index">
                <div class="images-header">
                    <div class="images-title">
                        <span>{{ item.title }}</span>
                    </div>
                    <div class="operate_btn">
                        <div class="sort common">
                            <i class="iconfont iconpaixu cursor"></i>
                        </div>
                        <div class="edit common cursor">
                            <i class="iconfont icontubiaoweb-07"></i>
                        </div>
                        <div class="del common cursor">
                            <i class="iconfont icontubiaoweb-27"></i>
                        </div>
                    </div>
                </div>
                <div class="images-body">
                    <div class="content-images">
                        <p>{{ item.content }}</p>
                    </div>
                    <div class="images" @click="showImages(item)">
                        <el-image :src="globalConfig.imagePath + item.extra" :preview-src-list="[globalConfig.imagePath + item.extra]"> </el-image>
                    </div>
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
            show: false,
            loading: false,
            list: []
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
        showImages(data) {
            this.show = true;
        },
        getList() {
            this.loading = true;
            hotspotContent(
                {
                    type: "get",
                    data: {
                        hotspotId: this.hotspotId,
                        type: "IMAGE",
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
.images-list-item {
    // height: 150px;
    border: 1px solid #eee;
    margin-bottom: 20px;
    padding: 12px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .images-header {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .images-title {
            span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
            }
        }
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
    }
    .images-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // height: 100px;
        .content-images {
            flex: 1;
            p {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 24px;
                color: rgba(102, 102, 102, 1);
            }
        }
        .images {
            width: 80px;
            height: 80px;
            margin-left: 8px;
            .el-image {
                width: 100%;
                height: 100%;
                max-width: 100%;
                img {
                    width: 100%;
                    height: 100%;
                    max-width: 100%;
                }
                /deep/ .el-image-viewer__wrapper {
                    .el-image-viewer__btn {
                        .el-icon-circle-close {
                            color: #ffa500;
                        }
                    }
                }
            }
        }
    }
}
</style>
