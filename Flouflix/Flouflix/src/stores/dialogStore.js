import { defineStore } from 'pinia';

export const useDialogStore = defineStore({
  id: 'dialogStore',
  state: () => ({
    dialogAccountVisible: false,
    dialogLogInFormVisible: false,
    dialogRegisterInFormVisible: false,
    userConnected: false,
    popDisconnectVisible: false,
    dialogConfirmVisible: false,
    dialogPasswordVisible: false,
    dialogForgetPassword: false,
    resetDone: false,
    activeStep: 0,
  }),
  actions: {
    // définir les actions de votre store ici
  },
  persist: {
    enabled: true
  }
})