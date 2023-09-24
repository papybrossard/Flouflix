<template>
    <div v-if="!this.dialogStore.resetDone">
        <p> Merci de renseigner ces informations afin de recuperer votre mot de passe </p>
        <el-form :model="form" ref="refForm">
            <el-form-item label="Nom d'utilisateur" prop="user">
                <el-input v-model="form.user" placeholder="Nom d'utilisateur" />
            </el-form-item>
            <el-form-item label="Adresse mail" prop="mail">
                <el-input v-model="form.mail" placeholder="Adresse mail" />
            </el-form-item>
            <el-form-item>
                <el-button @click="submitReset()"> Valider </el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="closeDialog()"> Annuler </el-button>
            </el-form-item>
        </el-form>
    </div>
    <div v-else>
        <p>
            Merci, si les informations sont exacte, vous allez recevoir un mail pour reinitialiser votre mot de passe
        </p>
        <el-button @click="closeDialog()"> OK </el-button>
    </div>
</template>
<script>
import { ElDialog, ElButton, ElMessage, ElInput, ElForm } from 'element-plus';
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
            user: "",
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
        closeDialog() {
            this.dialogAction.toggleDialogState();
            this.dialogAction.toggleDialogForgetPassword();
            this.dialogAction.toggleResetDone();
        },
        submitReset() {
            this.dialogAction.toggleResetDone();
            console.log(this.formSubmit);
            axios.get(urlAPI+'/api/user/resetPassword', {
                params: {
                    user: this.form.user,
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
<style></style>