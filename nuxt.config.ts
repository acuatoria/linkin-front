import { defineNuxtConfig } from 'nuxt/config'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  css: [
    '~/assets/scss/main.scss',
  ],
  build: {
    transpile: ['vuetify', 'pinia'],
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/',
    },
  },
  experimental: {
    viteNode: false,
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  ssr: true,
  vite: {
    plugins: [
      svgLoader(),
    ],
  },
})
