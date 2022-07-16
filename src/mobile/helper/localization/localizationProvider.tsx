import React, { createContext, FunctionComponent, ReactNode, useContext, useState } from 'react';

import translations from './translations';

// Create context to provide the translations.
const LocalizationContext = createContext({ translations: translations, changeLanguage: (key: string) => console.log(key) });
// Create a hook to access the translations.
const useTranslations = () => useContext(LocalizationContext);

interface ILocalizationProviderProps {
    /** The children. */
    children: ReactNode;
}

/**
 * Component to provide translations to the application.
 *
 * @param {ILocalizationProviderProps} props The localization provider properties.
 * @returns {FunctionComponent} The localization provider component.
 */
const LocalizationProvider: FunctionComponent<ILocalizationProviderProps> = (props) => {
    /** State to trigger a UI refresh after the language changed. */
    const [refreshState, setRefreshState] = useState<boolean>(false);

    /**
     * Change the UI language to the desired language.
     *
     * @param {string} key The short key of the desired language.
     */
    const changeLanguage = (key: string) => {
        translations.setLanguage(key);
        setRefreshState(!refreshState);
    };

    return <LocalizationContext.Provider value={{ translations: translations, changeLanguage: changeLanguage }}>{props.children}</LocalizationContext.Provider>;
};

export { useTranslations };
export default LocalizationProvider;
