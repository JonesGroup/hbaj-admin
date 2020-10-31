<template>
    <div class="RichTextBox">
        <div class="title">
            <p>{{ title || "此内容为空" }}</p>
        </div>
        <RichTextBox ref="RichTextBox"></RichTextBox>
    </div>
</template>

<script>
import RichTextBox from "@/components/common/RichTextBox";
export default {
    components: {
        RichTextBox
    },
    data() {
        return {
            title: "标题",
            RichTextValue: ""
        };
    }
};
</script>

<style lang="less" scoped>
.RichTextBox {
    .title {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        font-size: 16px;
        padding-left: 14px;
    }
}
</style>
