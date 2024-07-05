import { defineStore } from 'pinia';
import type { UserState } from '~/lib/types/IUser';

export const useUserStore = defineStore('user', {
    state: () => ({
      isLoading: false,
      isAuthed: false,
      userRole: '',
      authUser: {},
      activeTabAuthUserMenu: '',
      menuOpen: false,
      manager: null,
      user: null,
      isMenuOpen: false,
    }),
    actions: {
      setName(ob: Partial<UserState>) {
        Object.assign(this, ob);
        this.isAuthed = true;
      },
      setRole(role: string) {
        this.userRole = role;
        localStorage.setItem("userRole", role);
      },
      logOut() {
        const { $api } = useNuxtApp();
        try {
          $api.post("/logout").then((response) => {
            if (response) {
              localStorage.clear();
              this.authUser = {};
              this.userRole = "unknown";
              this.isAuthed = false;
            }
          });
        } catch (error) {
          console.log(error);
        }
      },
      getManagerData(data) {
        this.manager = data;
        localStorage.setItem("managerData", JSON.stringify(data));
      },
      getUserData(data) {
        this.authUser = data;
        localStorage.setItem("authUserData", JSON.stringify(data));
        this.user = data;
        this.isAuthed = true;
      },
      setManagerData(data) {
        this.manager = data;
      },
      setUserData(data) {
        this.authUser = data;
      },
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
    }
  });