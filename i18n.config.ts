import en from "./locale/en.json" with { type: "json" };

export default defineI18nConfig(() => ({
  defaultLocale: "en",
  legacy: false,
  locale: "en",
  locales: ["en"],
  messages: {
    en,
  },
  warnHtmlMessage: false,
}));
