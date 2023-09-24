import { defineStore } from 'pinia';

export const useMLStore = defineStore({
  id: 'MLStore',
  state: () => ({
    type: "",
    mechanic: "",
    duration: 180,
    age: 3,
    coldStartFilter: {
      type: "",
      mechanic: "",
      duration: 180,
      age: 3
    },
    recoDone : false,
    recoLoading: true,
    recoError: false,
    recommandations: [],
    coldRecommandations: [],
    games: {},
    coldGamesSelect: {}
  }),
  actions: {
    // définir les actions de votre store ici
  }
})