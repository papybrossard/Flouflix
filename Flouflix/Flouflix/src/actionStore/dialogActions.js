import { useDialogStore } from '../stores/dialogStore.js'

export const useDialogActions = () => {
  const store = useDialogStore();

  const toggleDialogState = () => {
    store.dialogAccountVisible = !store.dialogAccountVisible;
  }

  const toggleRegisterForm = () => {
    store.dialogRegisterInFormVisible = !store.dialogRegisterInFormVisible;
  }

  const toggleLoginForm = () => {
    store.dialogLogInFormVisible = !store.dialogLogInFormVisible;
  }

  const toggleUserConnectionState = () => {
    store.userConnected = !store.userConnected;
  }

  const togglePopDisconnect = () => {
    store.popDisconnectVisible = !store.popDisconnectVisible;
  }

  const toggleDialogDisconnect = () => {
    store.dialogConfirmVisible = !store.dialogConfirmVisible;
  }

  const setActiveStep = (step) => {
    store.activeStep = step;
  }

  const toggleDialogPassword = () => {
    store.dialogPasswordVisible = !store.dialogPasswordVisible;
  }

  const toggleDialogForgetPassword = () => {
    store.dialogForgetPassword = !store.dialogForgetPassword;
  }

  const toggleResetDone = () => {
    store.resetDone = !store.resetDone;
  }

  return {
    toggleDialogState, 
    toggleRegisterForm, 
    toggleLoginForm, 
    toggleUserConnectionState,
    togglePopDisconnect,
    toggleDialogDisconnect,
    toggleDialogPassword,
    setActiveStep,
    toggleDialogForgetPassword,
    toggleResetDone
  }
}