import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zhTW from './zh-TW.json';

i18n.use(initReactI18next).init({
  resources: {
    en,
    'zh-TW': zhTW
  },
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
