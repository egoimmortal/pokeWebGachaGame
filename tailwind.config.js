/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./composables/**/*.{js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8'
      },
    },
  },
  plugins: [],
}

