export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("load", async (action, errHandler) => {
    try {
      const response = await action();
      return response;
    } catch (error) {
      if (errHandler) {
        if (error.response?.data?.message === "Невірний пароль") {
          errHandler.password = error.response.data.message;
        } else {
          errHandler.email = error.response.data.message;
        }
      } else {
        console.error("An error occured:", error);
      }
    }
  });
});
