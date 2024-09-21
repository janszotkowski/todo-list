import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import cs from './locales/cs.json';

type TranslationResources = {
    en: typeof en;
    cs: typeof cs;
};

const availableLanguages = ['en', 'cs'];

const getInitialLanguage = (): string => {
    const savedLanguage = localStorage.getItem('language');
    const userLanguage = navigator.language || navigator.languages[ 0 ];
    return savedLanguage || (availableLanguages.includes(userLanguage.slice(0, 2)) ? userLanguage.slice(0, 2) : 'en');
};

i18n
    .use(initReactI18next)
    .init<TranslationResources>({
        resources: {
            en: {translation: en},
            cs: {translation: cs},
        },
        lng: getInitialLanguage(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
