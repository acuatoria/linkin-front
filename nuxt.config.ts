import { defineNuxtConfig } from 'nuxt/config'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  modules: [
    '@nuxt-alt/auth',
    '@nuxt-alt/http',
    '@nuxt-alt/proxy',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  css: [
    '~/assets/scss/main.scss',
  ],
  build: {
    transpile: ['vuetify', 'pinia', 'nuxt-alt.+'],
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/',
    },
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
    define: {
      'window.global': {},
    },
  },
  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  hooks: {
    'vite:extendConfig': function (config: any, { isServer }: any) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },
  auth: {
    redirect: {
      login: '/',
    },
    strategies: {
      local: {
        token: {
          required: true,
          property: 'token',
          type: 'token',
          maxAge: false,
        },
        endpoints: {
          login: {
            url: `${process.env.API_BASE_URL || 'http://localhost:8000/'}api-token-auth/`,
            method: 'post',
          },
          user: false,
          logout: {
            url: `${process.env.API_BASE_URL || 'http://localhost:8000/'}api-auth/logout/`,
            method: 'get',
          },
        },

      },
    },
  },
  app: {
    head: {
      meta: [
        {
          hid: 'og-image',
          property: 'og:image',
          content: 'https://pyxilink.com/og_image.png',
        },
      ],
    },
  },
})
