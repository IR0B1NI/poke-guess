/**
 * Retrieve the browser language code.
 *
 * @returns {string} The browser language code.
 */
export const getBrowserLanguageCode = (): string => {
    if (navigator) {
        return (navigator.languages && navigator.languages[0]) || navigator.language;
    }
    return 'en';
};

/**
 * Retrieve the short language key of the browser.
 *
 * @returns {string} The short language key.
 */
export const getBrowserLanguageCodeShort = (): string => {
    return getBrowserLanguageCode().slice(0, 2);
};
