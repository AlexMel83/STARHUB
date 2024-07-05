import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            isLoading: false,
            isAuthed: false,
            userRole: "",
            authUser: {},
            activeTabAuthUserMenu: "",
            menuOpen: false,
            manager: null,
            user: null,
            isMenuOpen: false,
        };
    },
    mutations: {
        setName(state, ob) {
            Object.assign(state, ob);
            state.isAuthed = true;
        },
        setRole(state, role) {
            state.userRole = role;
            localStorage.setItem("userRole", role);
        },
        logOut(state) {
            const { $api } = useNuxtApp();
            try {
                $api
                    .post("/logout")
                    .then((response) => {
                        if (response) {
                            localStorage.clear();
                            state.authUser = {};
                            state.userRole = "unknown";
                            state.isAuthed = false;
                        }

                    });
            } catch (error) {
                console.log(error);
            }

        },
        getManagerData(state, data) {
            state.manager = data;
            localStorage.setItem("managerData", JSON.stringify(data));
        },
        getUserData(state, data) {
            state.authUser = data;
            localStorage.setItem("authUserData", JSON.stringify(data));
            state.user = data;
            state.isAuthed = true;
        },
        setManagerData(state, data) {
            state.manager = data;
        },
        setUserData(state, data) {
            state.authUser = data;
        },
        toggleMenu(state) {
            state.isMenuOpen = !state.isMenuOpen;
        },
    },
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
    // Install the store instance as a plugin
});
