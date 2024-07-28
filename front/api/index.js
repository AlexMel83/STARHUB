import authModule from "./auth.ts";
import dealModule from "./deals.ts";
import commentModule from "./comments.ts";
import customerModule from "./customers.ts";
import sneakersModule from "./sneakers.ts";

export default function (instance) {
  return {
    auth: authModule(instance),
    deals: dealModule(instance),
    comments: commentModule(instance),
    customers: customerModule(instance),
    sneakers: sneakersModule(instance),
  };
}
