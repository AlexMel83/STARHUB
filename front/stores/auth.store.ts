interface IAuthStore {
  email: string;
  name: string;
  role: string;
  status: boolean;
  accessToken: string;
  refreshToken: string;
}

const defaultValue: { user: IAuthStore } = {
  user: {
    email: "",
    name: "",
    role: "",
    status: false,
    accessToken: "",
    refreshToken: "",
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,
  getters: {
    isAuth: (state) => state.user.status,
  },
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(input: IAuthStore) {
      this.$patch({ user: input });
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
