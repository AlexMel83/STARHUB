import authModule from "./auth.ts";
import dealModule from "./deals.ts";
import commentModule from "./comments.ts";
import customerModule from "./customers.ts";

export default function (instance) {
  return {
    auth: authModule(instance),
    deals: dealModule(instance),
    comments: commentModule(instance),
    customers: customerModule(instance),
  };
}
