import { AuthApi } from "../api/auth";

declare module "#app" {
  interface NuxtApp {
    $api: {
      auth: AuthApi;
      // Добавьте другие API, если они у вас есть
    };
    $load: <T>(
      action: () => Promise<T>,
      errHandler?: { [key: string]: string },
    ) => Promise<T>;
  }
}
