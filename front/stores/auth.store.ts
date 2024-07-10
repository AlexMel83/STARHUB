interface IAuthStore {
  email: string;
  name: string;
  role: string;
  isactivated: boolean;
}

const defaultValue: { user: IAuthStore } = {
  user: {
    email: "",
    name: "",
    role: "",
    isactivated: false,
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,
  getters: {
    isAuth: (state) => state.user.isactivated,
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
