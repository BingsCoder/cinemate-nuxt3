// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/device", "@vueuse/nuxt", "nuxt-lodash"],
  css: ["~/assets/scss/main.css"],
  runtimeConfig: {
    public: {
      tmdbAccessToken: "",
      tmdbBaseUrl: "https://api.themoviedb.org/3",
      tmdbMediaUrl: "https://image.tmdb.org/t/p/w440_and_h660_face",
    },
  },
  ui: {
    fonts: false,
  },
});
