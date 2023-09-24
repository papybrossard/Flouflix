<template>
    <el-card>
        <h1> HOT LIST </h1>
        <div v-for="(item, idx) in items" :key="idx" class="text item">
            {{ item.hotPlace }} . {{ item.name }}
        </div>
        <p v-if="!items"> Vous n'avez pas encore de Hot List! </p>
    </el-card>
</template>
<script>
import { ElCard } from 'element-plus';
import { useUserActions } from "@/actionStore/userActions";

export default {
    name: "HotList",
    setup() {
        const userAction = useUserActions();

        return { userAction }
    },
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    components: {
        ElCard
    }
}
</script>