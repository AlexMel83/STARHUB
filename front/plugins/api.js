import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";
import axios from "axios";
import api from "../api/index";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const router = useRouter();
  const store = useAuthStore();
  const isLoadingStore = useIsLoadingStore();

  const instance = axios.create({
    baseURL: config.public.localhostApi,
    withCredentials: true,
    headers: {
      accept: "application/json",
    },
  });

  const logout = async () => {
    isLoadingStore.set(true);
    await instance.get("/logout");
    store.clearUser();
    await router.push("/");
    isLoadingStore.set(false);
  };

  const refreshToken = async () => {
    try {
      const response = await instance.get("/refresh");
      const { accessToken } = response.data;

      const authUserStr = localStorage.getItem("authUser");
      if (!authUserStr) {
        throw new Error("No authUser found in localStorage");
      }
      const authUser = JSON.parse(authUserStr);
      authUser.accessToken = accessToken;
      localStorage.setItem("authUser", JSON.stringify(authUser));

      return accessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
      throw error;
    }
  };

  instance.interceptors.request.use(
    async (config) => {
      const authUserStr = localStorage.getItem("authUser");
      if (!authUserStr) {
        throw new Error("No authUser found in localStorage");
      }

      const authUser = JSON.parse(authUserStr);
      const token = authUser.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          logout();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  const apiInstance = api(instance);
  nuxtApp.provide("api", apiInstance);
});
