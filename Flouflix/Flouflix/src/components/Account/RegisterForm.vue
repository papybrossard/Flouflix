<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item label="Adresse e-mail" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Mot de passe" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="Confirmation" prop="secondPassword">
      <el-input type="password" v-model="form.secondPassword"></el-input>
    </el-form-item>
    <el-form-item label="Nom d'utilisateur BGG" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
  </el-form>
  <el-col :span="12" :offset="6">
    <el-button @click="cancelForm">Annuler</el-button>
    <el-button type="primary" @click="submitForm">Valider</el-button>
  </el-col>
</template>

<script>
import { ElButton, ElInput, ElForm, ElFormItem, ElCol, ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useDialogActions } from '@/actionStore/dialogActions.js';
import { useUserActions } from '@/actionStore/userActions.js';
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { sha256 } from 'js-sha256';

export default {
  setup() {
    const form = ref({
      email: '',
      username: '',
      password: '',
      secondPassword: ''
    })

    const dialogAction = useDialogActions()

    const userAction = useUserActions();

    const validateEmail = (rule, value, callback) => {
      const regexEmail = /^[^@]+@[^@]+\.[^@]+$/
      if (value === '') {
        callback(new Error("Merci de renseigner votre adresse email"));
      } else if (!regexEmail.test(value)) {
        callback(new Error("Merci de renseigner une adresse email valide"));
      }
    }

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
      if (value !== form.value.password) {
        callback(new Error('Les mots de passe doivent correspondre'));
      } else {
        callback();
      }

    }

    const rules = {
      email: [
        {
          required: true,
          message: "Adresse email requise",
          trigger: 'blur'
        },
        { validator: validateEmail, trigger: 'blur' }
      ],
      username: [
        {
          required: true,
          message: "Nom d'utilisateur BGG requis",
          trigger: 'blur'
        }
      ],
      password: [
        { required: true, message: 'Mot de passe requis', trigger: 'blur' }
        , { validator: validatePassword, trigger: 'blur' }
      ],
      secondPassword: [
        { required: true, message: 'Merci de retaper votre mot de passe', trigger: 'blur' }
        , { validator: validateSecondPassword, trigger: 'blur' }
      ]
    }

    const notif = (message, type) => {
      return ElMessage({
        message: message,
        type: type
      })
    }

    return { form, rules, dialogAction, userAction, notif }
  },
  name: 'RegisterForm',
  components: {
    ElButton,
    ElInput,
    ElForm,
    ElFormItem,
    ElCol
  },
  methods: {
    cancelForm() {
      this.$refs.formRef.resetFields();
      this.dialogAction.toggleRegisterForm();
    },
    submitForm() {
      const email = this.form.email;
      const username = this.form.username;
      const password = this.form.password;
      const secondPassword = this.form.secondPassword;

      const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@.$!%*?&]{12,}$/;

      if (!email || !username || !password || !secondPassword) {
        this.notif(
          "Merci de remplir tout les champs",
          'error'
        )
        return;
      }

      if (!regexEmail.test(email) || !regexPassword.test(password)) {
        this.notif(
          "Il y a une erreur dans le formulaire",
          'error'
        )
        return;
      }

      axios
        .get(urlAPI+"/api/register", {
          params: {
            email: email,
            username: username,
            password: sha256(password),
          },
        })
        .then((response) => {
          if (response.data.code == 201) {
            this.notif(
              response.data.message,
              'success'
            );
            this.userAction.setToken(response.data.token);
            this.dialogAction.toggleRegisterForm();
            this.dialogAction.toggleDialogState();
            this.$refs.formRef.resetFields();
          } else if (response.data.code != 400) {
            this.notif(
              response.data.message,
              'error'
            )
          }
        })
        .catch((response) => {
          console.log(response);
        });
      // réinitialiser le formulaire
      
    }
  }
}
</script>
