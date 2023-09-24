<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/img/Logo.png" alt="Logo" @click="welcome()">
    </div>
    <menu-site />
    <div v-if="!this.dialogStore.userConnected" class="user-avatar" @click="openDialog">
      <img src="@/assets/img/account.png" alt="Logo" />
    </div>
    <div class="account" v-else>
      <p> Bonjour,  {{ this.userStore.username }} </p>
    <disconnect />
  </div>
  </div>
</template>

<script>
import { useDialogActions } from '@/actionStore/dialogActions.js';
import { useDialogStore } from '@/stores/dialogStore.js';
import { useUserActions } from '@/actionStore/userActions.js';
import { useUserStore } from '@/stores/userStore.js';
import Disconnect from '@/components/Account/Disconnect.vue';
import MenuSite from "@/views/MenuSite.vue";

export default {  
  name:"HeaderSite",
  setup() {
      const dialogAction = useDialogActions();
      const userAction = useUserActions();
      const dialogStore = useDialogStore();
      const userStore = useUserStore();

      return { dialogAction, dialogStore, userAction, userStore };
    },
  components: {
    Disconnect,
    MenuSite
  },
  methods: {
    openDialog() {
      this.dialogAction.toggleDialogState();
    },
    welcome() {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss" scoped> @import "@/assets/scss/HeaderSite.scss" </style>