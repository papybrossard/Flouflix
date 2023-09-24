<template>
    <el-descriptions title="Mes infos personnelles" direction="vertical" :column="4" :size="size" :border="true">
        <el-descriptions-item>
            <template #label>
                <el-icon>
                    <Avatar />
                </el-icon>
                Nom d'utilisateur
            </template>
            {{ this.userStore.username }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <el-icon>
                    <place />
                </el-icon>
                Pays
            </template>
            {{ this.userStore.country }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <el-icon>
                    <mouse />
                </el-icon>
                Email
            </template>
            {{ this.userStore.email }}
        </el-descriptions-item>
    </el-descriptions>
</template>
<script>
import { useUserActions } from "@/actionStore/userActions";
import {
    ElDescriptions,
    ElDescriptionsItem,
    ElIcon
}
    from 'element-plus';
import {
    Refresh,
    Place,
    Avatar,
    Mouse,
    User,
} from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/userStore';


export default {
    name: "TopList",
    setup() {
        const userAction = useUserActions();
        const userStore = useUserStore();

        return { userAction, userStore }
    },
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    components: {
        Refresh,
        Place,
        Avatar,
        Mouse,
        User,
        ElIcon,
    }
}
</script>