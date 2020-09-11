import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pl from './strings/pl.json';
import en from './strings/en.json';
import de from './strings/de.json';

const resources = {
  pl: {
    translation: pl
  },
  en: {
    translation: en
  },
  de: {
    translation: de
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') === null ? 'en' : localStorage.getItem('lang'),

    keySeparator: '.',

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;