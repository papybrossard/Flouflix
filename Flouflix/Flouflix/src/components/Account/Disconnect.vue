<template>
    <div class="logo-on-off">
        <el-popover :visible="this.dialogStore.popDisconnectVisible" title="Mon espace" width="200">
            <div class="buttons-container">
                <el-button @click="disconnect()" class="buttons">Se Deconnecter</el-button>
                <router-link to="/espace-personnel">
                    <el-button type="primary" @click="this.dialogAction.togglePopDisconnect()" class="buttons">Mon Espace</el-button>
                </router-link>
            </div>
            <template #reference>
                <img v-if="this.dialogStore.userConnected" @click="popClick()" src="@/assets/img/logo_on_off.png" alt="Logo" class="imageDisconnect">
            </template>
        </el-popover>
    </div>
</template>
<script>
import {
    ElPopover,
    ElButton
} from 'element-plus';
import { useDialogActions } from '@/actionStore/dialogActions.js';
import { useDialogStore } from '@/stores/dialogStore.js';
import { useUserActions } from '@/actionStore/userActions.js';
import { useUserStore } from '@/stores/userStore.js';

export default {
    setup() {
        const dialogAction = useDialogActions();
        const userAction = useUserActions();
        const dialogStore = useDialogStore();
        const userStore = useUserStore();

        return {
            dialogAction,
            dialogStore,
            userAction,
            userStore,
        };
    },
    components: {
        ElPopover,
        ElButton
    },
    methods: {
        popClick() {
            this.dialogAction.togglePopDisconnect();
        },
        disconnect() {
            this.dialogAction.togglePopDisconnect();
            this.dialogAction.toggleDialogDisconnect();
        }
    },
};
</script>
<style lang="scss" scoped> @import "@/assets/scss/Disconnect.scss"
</style>