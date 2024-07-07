export default defineNuxtConfig({
  components: true,
  devtools: { enabled: false },
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
          Lato: {
            wght: [300, 400, 700],
            ital: [300],
          },
        },
      },
    ],
  ],
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  compatibilityDate: "2024-07-03",
});
