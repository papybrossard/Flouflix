<template>
  <el-alert v-if="alertVisible" :type="alertType" :description="alertTitle" show-icon />
  <el-form :model="form" ref="refForm" label-width="120px">
    <el-row>
      <el-form-item label="Nom d'utilisateur" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="Mot de passe" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-button  @click="resetForm">Annuler</el-button>
      <el-button  type="primary" @click="submitForm()">Se connecter</el-button>
    </el-row>
    <el-row class="forgot">
      <el-button type="primary" link @click="passwordForgot()" class="forgot-button"> Mot de passe oublié </el-button>
    </el-row>
  </el-form>
  <ResetPassword v-if="this.dialogStore.dialogForgetPassword" />
</template>
  
<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElRow, ElAlert, ElMessage } from "element-plus";
import { ref } from "vue";
import { useDialogActions } from '@/actionStore/dialogActions.js';
import { useUserActions } from "@/actionStore/userActions";
import { useDialogStore } from '@/stores/dialogStore';
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { sha256 } from 'js-sha256';
import ResetPassword from '@/components/Account/ResetPassword.vue';

export default {
  name: "LoginForm",
  components: { ElForm, ElFormItem, ElInput, ElButton, ElRow, ElAlert, ResetPassword },
  setup() {
    const form = ref({
      username: "",
      password: "",
    });
    const dialogAction = useDialogActions();
    const userActions = useUserActions();
    const dialogStore = useDialogStore();

    const notif = (message, type) => {
      ElMessage({
        message: message,
        type: type
      })
    }

    return { form, dialogAction, userActions, notif, dialogStore };
  },
  methods: {
    resetForm() {
      this.dialogAction.toggleLoginForm();
    },
    passwordForgot() {
      this.dialogAction.toggleDialogForgetPassword();
    },
    submitForm() {
      axios({
        methods: 'get',
        url: urlAPI+'/api/login',
        params: {
          username: this.form.username,
          password: sha256(this.form.password)
        }
      })
        .then((response) => {
          console.log(response)
          if (response.data.code === 200) {
            this.dialogAction.toggleUserConnectionState();
            this.dialogAction.toggleDialogState();
            this.dialogAction.toggleLoginForm();
            this.userActions.setUserName(response.data.username);
            this.userActions.setFirstName(response.data.firstname);
            this.userActions.setLastName(response.data.lastname);
            this.userActions.setCountry(response.data.country);
            this.userActions.setEmail(response.data.email);
            this.userActions.setToken(response.data.token);
            this.userActions.setRole(response.data.roles)
            this.notif(
              'Connexion réussie',
              'success'
            );
          } else if (response.data.code === 400) {
            this.notif(
              response.data.message,
              'error'
            );
          }
        })
        .catch((response, error) => {
          console.log("Il y a une erreur: " + error);
        })
    }
  },
};
</script>
<style lang="scss" scoped> @import "@/assets/scss/LoginForm.scss" </style>