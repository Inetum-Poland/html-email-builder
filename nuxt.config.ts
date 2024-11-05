// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/test-utils/module", "@nuxtjs/i18n", "@nuxt/eslint"],
  ssr: false,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "mjml" || /^(Mj[A-Z]|mj-)/.test(tag),
    },
  },
  devServer: {
    port: 3333,
  },
  compatibilityDate: "2024-04-03",
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: "double",
        arrowParens: "as-needed" as any,
        commaDangle: "only-multiline",
      },
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
});
