// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: true,
  devtools: { enabled: false },
  runtimeConfig: {
    public:{
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://pokeapi.co/api/v2/'
    }
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/main.scss'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    "@pinia/nuxt"
  ],
  plugins: [
    '~/plugins/fontawesome.js'
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
    ],
  },
})