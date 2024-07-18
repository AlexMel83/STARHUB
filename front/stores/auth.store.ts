import { defineStore } from "pinia";

interface User {
  email: string;
  name: string;
  role: string;
  isactivated: boolean;
}
interface AuthState {
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem("authUser", JSON.stringify(user));
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem("authUser");
    },
    initialize() {
      const storedUser = localStorage.getItem("authUser");
      storedUser ? (this.user = JSON.parse(storedUser)) : (this.user = null);
    },
  },
});

export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});
