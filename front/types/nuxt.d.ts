import type { DealApi } from "~/api/deals";
import { AuthApi } from "../api/auth";
import { CommentApi } from "../api/comments";

declare module "#app" {
  interface NuxtApp {
    $api: {
      auth: AuthApi;
      deals: DealApi;
      comments: CommentApi;
      // Добавьте другие API, если они у вас есть
    };
    $load: <T>(
      action: () => Promise<T>,
      errHandler?: { [key: string]: string },
    ) => Promise<T>;
  }
}
