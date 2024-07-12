import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  components: true,
  devtools: { enabled: true },
  plugins: [
    '~/plugins/api.js',
    '~/plugins/errorHandler.js',
  ],
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "shadcn-nuxt",
    "shadcn-nuxt",
    "@pinia/nuxt",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
      },
    ],
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: {
            wght: [300, 400, 700],
            ital: [300],
          },
        },
      },
    ],
  ],
  typescript: {
    strict: true
  },
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  runtimeConfig: {
    public: {
      localhostApi: process.env.API_LOCALHOST || 'http://localhost:3000',
    },
  },
  compatibilityDate: "2024-07-03",
});
