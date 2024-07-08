import axios from "axios";
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";

const baseURL = "http://localhost:4041";

let api, tokenAxios;

export const initialDataToken = async () => {
  tokenAxios = localStorage.getItem("access_token");
  api.defaults.headers.Authorization = `Bearer ${tokenAxios}`;
};

export const refreshToken = async () => {
  const authStore = useAuthStore();
  const isLoadingStore = useIsLoadingStore();

  try {
    isLoadingStore.set(true);
    const response = await api.get("/refresh");
    localStorage.setItem("access_token", response.data.accessToken);
  } catch (error) {
    console.error(error);
    authStore.clear();
    if (api.isCancel(error)) {
      throw error;
    }
  } finally {
    isLoadingStore.set(false);
  }
};

export default defineNuxtPlugin(() => {
  api = axios.create({
    baseURL,
    headers: {
      Authorization: "",
    },
  });
  api.defaults.withCredentials = true;

  api.interceptors.request.use(async (config) => {
    await initialDataToken();
    if (tokenAxios && localStorage.getItem("access_token")) {
      config.headers.Authorization = `Bearer ${tokenAxios}`;
    } else {
      config.headers.Authorization = "";
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status == 401 || error.response.status == 403) {
        await refreshToken();
        await initialDataToken();
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${tokenAxios}`;
        return api(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api: api,
    },
  };
});