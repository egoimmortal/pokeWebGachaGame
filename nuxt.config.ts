// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  runtimeConfig: {
    public:{
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://pokeapi.co/api/v2/'
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: ['@nuxtjs/tailwindcss'],
  vite:{
    css:{
      preprocessorOptions:{
        scss:{
          additionalData: '@use "~/assets/main.scss" as *;'
        }
      }
    }
  },
  plugins: [
    '~/plugins/fontawesome.js'
  ]
})