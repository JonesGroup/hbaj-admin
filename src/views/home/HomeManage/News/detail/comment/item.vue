<template>
    <div class="item_comment">
        <div class="user_name">
            <span>{{ item.userName }}</span>
        </div>
        <div class="comment_content">
            <p class="ellipsisLineTwo">
                {{ item.content }}
            </p>
        </div>
        <div class="info">
            <div class="date">
                <span>{{ item.createTime | formaData }}</span>
            </div>
            <div class="operate">
                <el-button type="text" @click="delCommon(item.id)">删除</el-button>
            </div>
            <!-- <div class="like_content">
                <div class="like">
                    <i class="iconfont icondianzan"></i>
                    <span>20</span>
                </div>
                <div class="reply">
                    <span>回复</span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { commentDetail } from "@/model/api";

export default {
    data() {
        return {};
    },
    props: {
        item: {
            type: Object,
            default: {}
        },
        onSuccess: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        delCommon(id) {
            commentDetail(
                {
                    type: "delete"
                },
                id
            ).then(res => {
                this.$message.success("删除成功");
                this.onSuccess && this.onSuccess();
            });
        }
    }
};
</script>

<style lang="less">
.item_comment {
    border-bottom: 1px solid #f5f5f5;
    padding: 15px 0px;
    .user_name {
        span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(15, 79, 168, 1);
            line-height: 19px;
        }
    }
    .comment_content {
        margin: 16px 0px;
        p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 22px;
            letter-spacing: 1px;
        }
    }
    .info {
        display: flex;
        justify-content: space-between;
        color: rgba(153, 153, 153, 1);
        .like_content {
            display: flex;
            align-items: center;
            .like {
                span {
                    margin-left: 8px;
                }
            }
            .reply {
                margin-left: 14px;
            }
        }
    }
}
</style>
