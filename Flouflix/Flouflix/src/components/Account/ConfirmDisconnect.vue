<template>
    <el-dialog v-model="this.dialogStore.dialogConfirmVisible" title="Deconnexion" class="dialog" width="25vw">
        <p> Êtes-vous sûr de vouloir vous deconnecter ? </p>
        <div class="buttons">
            <el-button @click="closeDialog()"> Annuler </el-button>
            <el-button type="primary" @click="disconnect()"> Confirmer </el-button>
        </div>
    </el-dialog>
</template>
<script>
import { ElDialog, ElButton, ElMessage } from 'element-plus';
import { useDialogActions } from '@/actionStore/dialogActions';
import { useUserActions } from '@/actionStore/userActions';
import { useDialogStore } from '@/stores/dialogStore';
export default {
    name: "ConfirmDisconnect",
    setup() {
        const dialogAction = useDialogActions();
        const userAction = useUserActions();
        const dialogStore = useDialogStore();
        const notif = () => {
            ElMessage({
                message: 'Déconnecté'
            });
        }
        return { dialogStore, dialogAction, userAction, notif }
    },
    components: {
        ElDialog,
        ElButton,
        ElMessage
    },
    methods: {
        closeDialog() {
            this.dialogAction.toggleDialogDisconnect();
        },
        disconnect() {
            this.notif();
            this.dialogAction.toggleDialogDisconnect();
            this.dialogAction.toggleUserConnectionState();
            this.userAction.emptyUserStore();
            this.$router.push({ path: '/' });
        }
    }
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/ConfirmDisconnect.scss"
</style>