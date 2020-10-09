<template>
    <div class="main mgT24">
        <ComponentTabs />
    </div>
</template>

<script>
import ComponentTabs from "./component";
import { department } from "@/model/api";

export default {
    components: {
        ComponentTabs
    },
    data() {
        return {
            loading: false
        };
    },
    methods: {
        getList() {
            const id = this.$route.params.id;
            this.loading = true;
            department({
                type: "GET",
                data: {
                    page: 1,
                    size: 1000,
                    enterpriseId: "1"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { content } = res.data;
                    console.log(content, "content");
                }
            });
        }
    },
    created() {
        this.getList();
    }
};
</script>
