import { useUserStore } from '../stores/userStore.js'

export const useUserActions = () =>{
    const store = useUserStore();

    const setFirstName = (firstName) => {
        store.firstname = firstName;
    }

    const setLastName = (lastName) => {
        store.lastname = lastName;
    }

    const setUserName = (userName) => {
        store.username = userName;
    }

    const setEmail = (email) => {
        store.email = email;
    }

    const setCountry = (country) => {
        store.country = country;
    }

    const setToken = (token) => {
        store.token = token;
    }

    const setRole = (role) => {
        store.role = role;
    }

    const setColdStartFilter = (filter) => {
        store.coldStartFilter = filter;
    }

    const getFirstName = () => {
        return store.firstname
    }

    const getLastName = () => {
        return store.lastname;
    }

    const getUserName = () => {
        return store.username;
    }

    const getCountry = () => {
        return store.country;
    }

    const getEmail = () => {
         return store.email;
    }

    const getToken = () => {
        return store.token;
    }

    const getColdStartFilter = () => {
        return store.coldStartFilter;
    }

    const getRole = () => {
        return store.role;
    }


    const emptyUserStore = () => {
        setToken("");
        setUserName("");
        setFirstName("");
        setLastName("");
        setCountry("");
        setEmail("");
        setRole("");
    }

    return {
        getFirstName, setFirstName,
        getLastName, setLastName,
        getUserName, setUserName,
        getEmail, setEmail,
        getToken, setToken,
        getCountry, setCountry,
        emptyUserStore,
        getColdStartFilter, setColdStartFilter,
        getRole, setRole
    }
}