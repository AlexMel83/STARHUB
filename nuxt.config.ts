export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', "shadcn-nuxt", 'shadcn-nuxt',],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})