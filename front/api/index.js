import authModule from './auth.ts';
import dealModule from './deals.ts';

export default function(instance) {
  return {
    auth: authModule(instance),
    deals: dealModule(instance),
  };
}