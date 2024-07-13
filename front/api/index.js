import authModule from './auth.ts';
import dealModule from './deals.ts';
import commentModule from './comments.ts';

export default function(instance) {
  return {
    auth: authModule(instance),
    deals: dealModule(instance),
    comments: commentModule(instance),
  };
}