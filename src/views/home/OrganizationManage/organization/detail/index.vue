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
    }
};
</script>
