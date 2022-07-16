import translations from './translations';

/**
 * Change the UI language.
 *
 * @param {string} languageKey The language key of the desired translation language.
 */
const changeLanguage = (languageKey: string) => {
    translations.setLanguage(languageKey);
};

export { changeLanguage };
