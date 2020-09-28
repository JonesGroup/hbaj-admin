<template>
    <div class="news_detail">
        <div class="news_content" v-loading="loading">
            <div class="detail">
                <div class="title">
                    <p class="ellipsisLineTwo">
                        {{ data.title }}
                    </p>
                </div>
                <div class="organization">
                    <span>{{ data.author }}</span>
                    <span>{{ data.publishTime | formaData }}</span>
                </div>
                <div class="content-news-detail" v-html="data.contentHtml"></div>
            </div>
            <div class="news_detail_comment">
                <div class="cmmment_title">
                    <h2>评论区</h2>
                </div>
                <div class="comment_input">
                    <input type="text" placeholder="写下您的评论……" v-model="content" />
                    <button @click="addComment">评论</button>
                </div>
                <Comment ref="comment"></Comment>
            </div>
        </div>
    </div>
</template>

<script>
import Comment from "./comment";
import { newsDetail, addComment } from "@/model/api";
import store from "@/widget/store";
export default {
    data() {
        return {
            data: {},
            loading: false,
            content: ""
        };
    },
    components: {
        Comment
    },
    watch: {
        $route: function() {
            this.getNewsDetail();
        }
    },
    methods: {
        getNewsDetail() {
            this.loading = true;
            const { id } = this.$route.params;
            newsDetail(
                {
                    type: "get"
                },
                id
            ).then(res => {
                this.loading = false;
                if (res.suceeded) {
                    this.data = res.data;
                }
            });
        },
        addComment() {
            if (!window.localStorage.getItem("authorization")) {
                this.$store.commit("TOGGLE_LOGIN");
                return false;
            }
            const { id } = this.$route.params;
            const { content } = this;
            addComment({
                type: "POST",
                data: {
                    content,
                    relatedId: id,
                    type: "NEWS",
                    userId: store.get("userId", "local")
                }
            }).then(res => {
                this.$refs.comment.getComment();
            });
        }
    },
    mounted() {
        this.getNewsDetail();
    }
};
</script>

<style lang="less">
.news_detail {
    height: 100%;
    background: #fff;
    overflow: hidden;
    .news_content {
        overflow-y: scroll;
        padding: 25px;
        height: 100%;
        .detail {
            .title {
                font-size: 18px;
                font-family: MicrosoftYaHei;
                color: rgba(0, 0, 0, 1);
                line-height: 24px;
            }
            .organization {
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 16px;
                margin-top: 16px;
                margin-bottom: 24px;
            }
            .content-news-detail {
                p {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    color: rgba(51, 51, 51, 1);
                    line-height: 21px;
                    letter-spacing: 1px;
                }
            }
        }
        .news_detail_comment {
            margin-top: 50px;
            .cmmment_title {
                h2 {
                    font-size: 18px;
                    font-family: MicrosoftYaHei;
                    color: rgba(0, 0, 0, 1);
                    line-height: 24px;
                    letter-spacing: 1px;
                    position: relative;
                    padding-left: 10px;
                    &::before {
                        content: "";
                        width: 4px;
                        height: 24px;
                        background: rgba(15, 79, 168, 1);
                        position: absolute;
                        left: 0;
                    }
                }
            }
            .comment_input {
                display: flex;
                margin-top: 23px;
                input {
                    flex: 1;
                    height: 49px;
                    line-height: 49px;
                    border: 1px solid rgba(221, 221, 221, 1);
                    color: rgba(153, 153, 153, 1);
                    font-size: 12px;
                    padding-left: 10px;
                }
                button {
                    width: 119px;
                    height: 48px;
                    background: rgba(22, 61, 163, 1);
                    color: #fff;
                }
            }
        }
    }
}
</style>
