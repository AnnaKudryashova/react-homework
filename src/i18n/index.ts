import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en/translation.json';
import deTranslation from '../locales/de/translation.json';
import frTranslation from '../locales/fr/translation.json';
import ltTranslation from '../locales/lt/translation.json';

void i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslation },
        de: { translation: deTranslation },
        fr: { translation: frTranslation },
        lt: { translation: ltTranslation },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
