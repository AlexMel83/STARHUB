export default defineNuxtConfig({
  components: true,
  devtools: { enabled: false },
  app: {
    head:{
      title: 'StarHub',
      meta: [
        { name: 'discription', content: 'StarHub - зручна та корисна екосистема.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      ],
      // link: [
      //   { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=', crossorigin: '' }
      // ],
    }
  },
  plugins: [
    '~/plugins/axios', '~/plugins/pinia',
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
  runtimeConfig: {
    public: {
      localhostApi: process.env.API_LOCALHOST || 'http://localhost:3000',
    },
  },
  compatibilityDate: "2024-07-03",
});
