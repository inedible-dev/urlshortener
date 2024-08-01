import "./env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ["@prisma/nuxt", "@nuxtjs/tailwindcss"],
  alias: {
    ".prisma/client/default": "./node_modules/.pnpm/@prisma+client@5.17.0_prisma@5.17.0/node_modules/.prisma/client/default.js",
    ".prisma/client/index-browser": "./node_modules/.pnpm/@prisma+client@5.17.0_prisma@5.17.0/node_modules/.prisma/client/index-browser.js"
  },
  imports: {
    dirs: [
      'composables'
    ]
  },
  routeRules: {
    '/**': { ssr: true },
    '/new': { ssr: false }
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
    }
  }
})