import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import axios from "axios";
import api from "../api/index";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.localhostApi,
    withCredentials: true,
    headers: {
      accept: "application/json",
    },
  });

  let accessToken = null;

  const refreshToken = async () => {
    try {
      const response = await instance.get("/refresh");
      accessToken = response.data.accessToken;
      localStorage.setItem("access_token", accessToken);
      return accessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Здесь вы можете добавить логику для выхода пользователя
      // например, перенаправление на страницу входа
      throw error;
    }
  };

  instance.interceptors.request.use(
    async (config) => {
      if (!accessToken) {
        accessToken = localStorage.getItem("access_token");
      }
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // Если не удалось обновить токен, перенаправьте на страницу входа
          // или выполните другое действие по вашему усмотрению
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  const apiInstance = api(instance);
  nuxtApp.provide("api", apiInstance);
});
