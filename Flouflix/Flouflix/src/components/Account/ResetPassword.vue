<template>
    <div>
        <el-dialog v-model="this.dialogStore.dialogForgetPassword" title="Récupération Mot de passe" width="30vw">
            <div v-if="!this.dialogStore.resetDone">
                <el-form :model="form" ref="refForm">
                    <el-form-item label="Nom d'utilisateur:" prop="username">
                        <el-input v-model="form.username" placeholder="Nom d'utilisateur" />
                    </el-form-item>
                    <el-form-item label="Adresse mail:" prop="mail">
                        <el-input v-model="form.mail" placeholder="Adresse mail" />
                    </el-form-item>
                    <div class="buttons">
                        <el-form-item>

                            <el-button @click="closeDialog(false)"> Annuler </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitReset()"> Valider </el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div v-else>
                <p>
                    Merci, si les informations sont exacte, vous allez recevoir un mail pour reinitialiser votre mot de
                    passe
                </p>
                <el-button @click="closeDialog(true)">OK</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { ElDialog, ElButton, ElInput, ElForm } from 'element-plus';
import { useDialogActions } from '@/actionStore/dialogActions';
import { useUserActions } from '@/actionStore/userActions';
import { useDialogStore } from '@/stores/dialogStore';
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { ref } from 'vue';

export default {
    setup() {
        const form = ref({
            mail: "",
            username: "",
        })
        const dialogAction = useDialogActions();
        const userAction = useUserActions();
        const dialogStore = useDialogStore();
        const formSubmit = false;

        return { dialogStore, dialogAction, userAction, form, formSubmit }
    },
    components: {
        ElDialog,
        ElButton,
        ElInput,
        ElForm
    },
    methods: {
        closeDialog(done) {
            this.dialogAction.toggleDialogState();
            this.dialogAction.toggleDialogForgetPassword();
            if(done) {
                this.dialogAction.toggleResetDone();
            } 
        },
        submitReset() {
            this.dialogAction.toggleResetDone();
            axios.get(urlAPI+'/api/user/resetPassword', {
                params: {
                    username: this.form.username,
                    mail: this.form.mail
                }
            })
                .then((response) => {
                    console.log(response)
                })
        },
    }
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/ResetPassword.scss"
</style>