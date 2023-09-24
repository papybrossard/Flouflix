<template>
    <el-card>
        <h1> TOP LIST </h1>
        <div v-for="(item, idx) in items" :key="idx" class="text item">
            {{ item.topPlace }} . {{ item.name }}
        </div>
        <p v-if="!items"> Vous n'avez pas encore de Top List! </p>
    </el-card>
</template>
<script>
import { ElCard } from 'element-plus';
import { useUserActions } from "@/actionStore/userActions";

export default {
    name: "TopList",
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