import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE } from "./Config/Languages";
import { CURRENT_HOST } from "./Config/Paths";

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    lng: DEFAULT_LANGUAGE.code,
    fallbackLng: "EN",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${CURRENT_HOST}/i18n/{{lng}}.json`,
    },
  });

export default i18n;