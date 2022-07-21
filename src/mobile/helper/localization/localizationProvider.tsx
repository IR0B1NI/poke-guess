import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFromStorage, storeJson } from 'poke-guess-shared';
import React, { createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

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
    /** Whether the localization is initialized or not. */
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    /** State to trigger a UI refresh after the language changed. */
    const [refreshState, setRefreshState] = useState<boolean>(false);

    /** The key to store and restore the users preferred UI language. */
    const languageStorageKey = 'preferred-language';

    /**
     * Change the UI language to the desired language.
     *
     * @param {string} key The short key of the desired language.
     */
    const changeLanguage = useCallback(
        async (key: string) => {
            translations.setLanguage(key);
            await storeJson(languageStorageKey, key, AsyncStorage.setItem);
            setRefreshState(!refreshState);
        },
        [refreshState]
    );

    /** Initially set the UI language based on the users preferences. */
    useEffect(() => {
        if (isInitialized) {
            // If the app language is already initialized, return.
            return;
        }
        const initPreferredLanguage = async () => {
            // Ensure the initialization is not done more than once.
            setIsInitialized(true);
            // Try to get a user preference for the language from device storage.
            const storedLanguage = await getFromStorage<string>(languageStorageKey, AsyncStorage.getItem);
            if (!storedLanguage) {
                return;
            }
            // If there is a preferred language, update the UI language.
            changeLanguage(storedLanguage);
        };
        initPreferredLanguage();
    }, [changeLanguage, isInitialized]);

    return <LocalizationContext.Provider value={{ translations: translations, changeLanguage: changeLanguage }}>{props.children}</LocalizationContext.Provider>;
};

export { useTranslations };
export default LocalizationProvider;
