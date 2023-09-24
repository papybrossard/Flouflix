<template>
    <el-dialog v-model="dialogPasswordVisible" title="Modifier mon mot de passe" width="25%" @closed="closedModal()">
        <el-form :model="form" :rules="rules" ref="formRef">
            <el-form-item label="Mot de passe"  prop="password">
                <el-input type="password"  v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="Nouveau Mot de passe" prop="newPass" >
                <el-input type="password" v-model="form.newPass"></el-input>
            </el-form-item>
            <el-form-item label="Confirmation" prop="confPass" >
                <el-input type="password" v-model="form.confPass"></el-input>
            </el-form-item>
            <el-form-item prop="confPass">
                <el-button @click="submitForm()"> Valider </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
 import { ElDialog, ElInput, ElForm, ElFormItem, ElButton, ElMessage } from 'element-plus';
 import { ref } from 'vue';
 import { computed } from "vue";
 import { useDialogActions } from '@/actionStore/dialogActions.js';
 import { useUserActions } from '@/actionStore/userActions.js';
 import { useDialogStore } from '@/stores/dialogStore.js';
 import { useUserStore } from '@/stores/userStore.js';
 import { sha256 } from 'js-sha256';

 export default {
    setup() {

    const form = ref({
      password: '',
      newPass: '',
      confPass: ''
    })

    const dialogAction = useDialogActions();
    const userAction = useUserActions();
    const dialogStore = useDialogStore();
    const userStore = useUserStore();
    
    const validatePassword = (rule, value, callback) => {
      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@.$!%*?&]{12,}$/
      if (value === '') {
        callback(new Error('Veuillez entrer un mot de passe'))
      } else if (!regexPassword.test(value)) {
        callback(
          new Error(
            'Le mot de passe doit contenir au moins 12 caractères, dont une majuscule, un chiffre et un caractère spécial'
          )
        )
      }
    }

    const validateSecondPassword = (rule, value, callback) => {
      if (value !== form.value.newPass) {
        callback(new Error('Les mots de passe doivent correspondre'));
      } else {
        callback();
      }
    }

    const rules = {
      newPass: [
        { required: true, message: 'Mot de passe requis', trigger: 'blur' }
        , { validator: validatePassword, trigger: 'blur' }
      ],
      confPass: [
        { required: true, message: 'Merci de retaper votre mot de passe', trigger: 'blur' }
        , { validator: validateSecondPassword, trigger: 'blur' }
      ]
    }

    const dialogPasswordVisible = computed(() => dialogStore.dialogPasswordVisible);

    const notif = (message, type) => {
        ElMessage({
          message: message, 
          type: type
        })
      }

    return { form, rules, dialogAction, dialogPasswordVisible, userStore, userAction, dialogStore, notif }
    },
    components: {
        ElDialog,
        ElInput,
        ElForm,
        ElFormItem,
        ElButton
    },
    methods: {
      closedModal() {
        this.$refs.formRef.resetFields();
        if(this.dialogStore.dialogPasswordVisible) {
          this.dialogAction.toggleDialogPassword();
        }
      },
      submitForm() {
        axios({
        method: 'get',
        url: urlAPI+"/api/user/replacePassword",
        headers: {
            'Authorization' : 'Bearer ' + this.userAction.getToken()
        },
         params: {
            username: this.userStore.username,
            password: sha256(this.form.password),
            newPassword: sha256(this.form.newPass),
          },
        })
        .then((response) => {
          if (response.data.code == 200) {
            this.notif(
              response.data.message,
              response.data.status
            );
            this.closedModal();
          } else if (response.data.code == 400) {
            this.notif(
              response.data.message,
              response.data.status
            )
          }
        })
        .catch((response, error) => {
          console.log("erreur");
          console.log(error);
        });
      }
    }
 }
</script>