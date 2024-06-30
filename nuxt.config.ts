export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    "shadcn-nuxt",
    'shadcn-nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        Lato: {
          wght: [300, 400, 700],
          ital: [300],
        }
      }
    }],
    "@nuxt/icon"
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  }
})