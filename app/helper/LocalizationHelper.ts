import i18next, { i18n, InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import german from '../assets/translations/de.json';
import english from '../assets/translations/en.json';

/**
 * Singleton instance.
 */
let instance: i18n | undefined = undefined;

/**
 * The initialization options for i18next.
 */
const initOptions: InitOptions = {
    lng: 'en',
    fallbackLng: 'en',
    cache: {
        enabled: true,
    },
    resources: {
        en: {
            translation: english,
        },
        de: {
            translation: german,
        },
    },
};

/**
 * Init the singleton.
 *
 * @param {string} languageShortKey The language short key.
 * @returns {i18n} The i18next instance.
 */
export const initialize = async (languageShortKey?: string) => {
    if (!instance) {
        if (languageShortKey && languageShortKey !== '') {
            initOptions.lng = languageShortKey;
        }
        // Initially set the html lang tag based on the stored language.
        document.documentElement.lang = initOptions.lng ? initOptions.lng : 'en';
        await i18next.use(initReactI18next).init(initOptions);
        instance = i18next;
    }
    return instance;
};

export default instance;
