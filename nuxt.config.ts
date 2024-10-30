// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    baseURL: "/form-constructor/",
  },

  ssr: true,
  css: ["@/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern", "legacy"
          quietDeps: true,
        },
      },
    },
  },
});
