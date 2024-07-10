import { defineNuxtPlugin } from '#app';
import axios from 'axios';
import api from '../api/index';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.localhostApi,
    withCredentials: true,
    headers: {
      accept: 'application/json',
    },
  });

  const apiInstance = api(instance);
  nuxtApp.provide('api', apiInstance);
});