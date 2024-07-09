import instance from "./instance";
import authModule from "./auth.ts";

export default {
  auth: authModule(instance),
};
