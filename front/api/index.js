import authModule from './auth.ts';

export default function(instance) {
  return {
    auth: authModule(instance),
  };
}