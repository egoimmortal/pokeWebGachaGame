// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  vite:{
    css:{
      preprocessorOptions:{
        scss:{
          additionalData: '@use "~/assets/_colors.scss" as *;'
        }
      }
    }
  }
})
