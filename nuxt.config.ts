// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@prisma/nuxt", "@nuxtjs/tailwindcss"],
  alias: {
    ".prisma/client/default": "./node_modules/.pnpm/@prisma+client@5.16.1_prisma@5.16.1/node_modules/.prisma/client/default.js",
    ".prisma/client/index-browser": "./node_modules/.pnpm/@prisma+client@5.16.1_prisma@5.16.1/node_modules/.prisma/client/index-browser.js"
  }
})