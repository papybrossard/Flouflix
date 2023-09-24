import { useMLStore } from '../stores/mlStore.js'

export const useMLActions = () =>{
    const store = useMLStore();

    const setRecommandations = (recommandations) => {
        store.recommandations = recommandations;
    }

    const setColdRecommandations = (recommandations) => {
        store.coldRecommandations = recommandations;
    }

    const setType = (type) => {
        store.type = type;
    }

    const setMechanic = (mechanic) => {
        store.mechanic = mechanic;
    }

    const setDuration = (duration) => {
        store.duration = duration;
    }

    const setAge = (age) => {
        store.age = age;
    }

    const setColdType = (coldType) => {
        store.coldStartFilter.type = coldType;
    }

    const setColdMechanic = (coldMech) => {
        store.coldStartFilter.mechanic = coldMech;
    }

    const setColdDuration = (coldDuration) => {
        store.coldStartFilter.duration = coldDuration;
    }

    const setColdAge = (coldAge) => {
        store.coldStartFilter.age = coldAge;
    }

    const setColdGamesSelect = (gamesSelect) => {
        store.coldGamesSelect = gamesSelect;
    }

    const setGames = (games) => {
        store.games = games;
    }

    const getRecommandations = () => {
        return store.recommandations;
    }

    const getColdRecommandations = () => {
        return store.coldRecommandations;
    }

    const getType = () => {
        return store.type;
    }

    const getMechanic = () => {
        return store.mechanic;
    }

    const getDuration = () => {
        return store.duration;
    }

    const getAge = () => {
        return store.age;
    }

    const getColdGamesSelect = () => {
        return store.coldGamesSelect;
    }

    const getGames = () => {
        return store.games;
    }

    const getColdType = () => {
        return store.coldStartFilter.type;
    }

    const getColdMechanic = () => {
        return store.coldStartFilter.mechanic;
    }

    const getColdDuration = () => {
        return store.coldStartFilter.duration;
    }

    const getColdAge = () => {
        return store.coldStartFilter.age;
    }

    const toggleRecoDone = () =>{
        store.recoDone = !(store.recoDone);
    }

    const toggleRecoLoading = () =>{
        store.recoLoading = !(store.recoLoading);
    }

    const toggleRecoError = (val) => {
        store.recorError = val;
    }

    return {
        getRecommandations, setRecommandations,
        getType, setType,
        getMechanic, setMechanic,
        getDuration, setDuration,
        getAge, setAge,
        getColdGamesSelect, setColdGamesSelect,
        getGames, setGames,
        getColdType, setColdType,
        getColdMechanic, setColdMechanic,
        getColdDuration, setColdDuration,
        getColdAge, setColdAge,
        setColdRecommandations, getColdRecommandations,
        toggleRecoDone, toggleRecoLoading,
        toggleRecoError
    }
}