import api from '../api/index';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('api', api);
});