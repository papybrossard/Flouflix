import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    role:"",
    token: "",
    country: "",
    coldStartFilter: {
      type: "",
      mechanic: "",
      duration: [0,100],
      age: 0
    }
  }),
  actions: {
    // définir les actions de votre store ici
  },
  persist: {
    enabled: true
  }
})