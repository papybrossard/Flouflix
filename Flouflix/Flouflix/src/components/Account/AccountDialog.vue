<template>
  <div>
    <el-dialog v-model="dialogAccountVisible" title="Espace personnel" width="25vw" @closed="closedWindows()">
      <div v-if="dialogRegisterInFormVisible">
        <register-form />
      </div>
      <div v-else-if="dialogLogInFormVisible">
        <login-form />
      </div>
      <div class="accountButton" v-else>
        <el-button type="primary" @click="showRegister">
          Inscription
        </el-button>
        <el-button type="primary" @click="showLogin">
          Connexion
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { useDialogStore } from "@/stores/dialogStore.js";
import { useDialogActions } from '@/actionStore/dialogActions.js';
import { ElDialog, ElButton } from "element-plus";
import RegisterForm from "./RegisterForm.vue";
import LoginForm from "./LoginForm.vue";
import { computed, onBeforeUnmount } from "vue";

export default {
  name: "AccountDialog",
  setup() {
    const store = useDialogStore();

    const dialogAccountVisible = computed(() => store.dialogAccountVisible);
    const dialogRegisterInFormVisible = computed(() => store.dialogRegisterInFormVisible)
    const dialogLogInFormVisible = computed(() => store.dialogLogInFormVisible)
    const dialogAction = useDialogActions();

    onBeforeUnmount(() => {
      dialogAction.toggleDialogState(false);
    });

    return {
      dialogAccountVisible,
      dialogAction,
      dialogRegisterInFormVisible,
      dialogLogInFormVisible
    };
  },
  components: {
    ElDialog,
    ElButton,
    RegisterForm,
    LoginForm
  },
  methods: {
    showLogin() {
      this.dialogAction.toggleLoginForm();
    },
    showRegister() {
      this.dialogAction.toggleRegisterForm();
    },
    closedWindows() {
      if (this.dialogAccountVisible) {
        this.dialogAction.toggleDialogState();
      }
      if (this.dialogLogInFormVisible) {
        this.dialogAction.toggleLoginForm();
      }
      if (this.dialogRegisterInFormVisible) {
        this.dialogAction.toggleRegisterForm();
      }
    }
  }
};
</script>

<style scoped>
.accountButton {
  display: flex;
}

</style>