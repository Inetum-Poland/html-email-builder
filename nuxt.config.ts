// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/test-utils/module",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
  ],
  ssr: false,
  app: {
    baseURL: process.env.BASE_URL,
  },
  css: ["~/assets/styles/global.css"],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "mjml" || /^(Mj[A-Z]|mj-)/.test(tag),
    },
  },
  alias: {
    "@blocks": "./components/editor/blocks/index.ts",
    "@commands": "./components/editor/commands/commands.ts",
    "@defaults": "./components/editor/blocks/defaults.ts",
    "@keymaps": "./components/editor/keymaps/keymaps.ts",
    "@modals": "./components/editor/modals/index.ts",
    "@panels": "./components/editor/panels/index.ts",
    "@types": "./components/editor/types.ts",
    "@utils": "./components/editor/utils/index.ts",
  },
  devServer: {
    port: 3333,
  },
  compatibilityDate: "2024-04-03",
  telemetry: false,
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
  pwa: {
    manifest: {
      name: "HTML Email Builder",
      short_name: "HTML Email Builder",
      display: "fullscreen",
      theme_color: "#232d4b",
      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },
});
