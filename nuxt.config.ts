// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
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
