import { defineStore } from "pinia";

export interface AuthResponse {
  status: number;
  data: {
    user: {
      id: number;
      email: string | null;
      facebook_id: string | null;
      google_id: string | null;
      name: string;
      surname: string;
      phone: string;
      picture: string;
      role: string;
      social_login: boolean;
      isactivated: boolean;
      created_at: string;
      udated_at: string;
    };
    url: string;
    accessToken: string;
    expAcToken: string;
    expRfToken: string;
  };
}
interface User {
  user: {
    id: number;
    email: string | null;
    facebook_id: string | null;
    google_id: string | null;
    name: string;
    surname: string;
    phone: string;
    picture: string;
    role: string;
    social_login: boolean;
    isactivated: boolean;
    created_at: string;
    udated_at: string;
  };
  url: string;
  accessToken: string;
  expAcToken: string;
  expRfToken: string;
}
interface AuthState {
  authUser: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    authUser: null,
  }),
  actions: {
    setUser(authUser: User) {
      this.authUser = authUser;
      localStorage.setItem("authUser", JSON.stringify(authUser));
    },
    clearUser() {
      this.authUser = null;
      localStorage.removeItem("authUser");
    },
    initialize() {
      const storedUser = localStorage.getItem("authUser");
      storedUser
        ? (this.authUser = JSON.parse(storedUser))
        : (this.authUser = null);
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
