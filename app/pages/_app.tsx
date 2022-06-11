import '../styles/global-styles.css';

import { StoreProvider } from 'easy-peasy';
import { i18n } from 'i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getBrowserLanguageCodeShort } from '../helper/BrowserHelper';
import { initialize } from '../helper/LocalizationHelper';
import { Store } from '../store/Store';

/**
 * The main entry point of the next js application.
 *
 * @param {AppProps} param0 The properties of the app component.
 * @returns {FunctionComponent} The application component.
 */
const App: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => {
    /** The state of the i18n instance. */
    const [i18nInstance, setI18nInstance] = useState<i18n | undefined>(undefined);

    /** Initialize the application. */
    useEffect(() => {
        const storedSettingsString = localStorage.getItem('userSettings');
        const userSettings = storedSettingsString
            ? JSON.parse(storedSettingsString)
            : {
                language: '',
            };
        Store.getActions().UserModel.updateUserSettings(userSettings);
        const initLanguage = Store.getState().UserModel.userSettings?.language ? Store.getState().UserModel.userSettings?.language : getBrowserLanguageCodeShort();
        // Initialize i18next.
        initialize(initLanguage).then((i) => {
            setI18nInstance(i);
        });
    }, []);

    /**
     * The custom head component.
     *
     * @returns {Element} The custom head element.
     */
    const CustomHead = () => (
        <Head>
            <title>Poke Guess</title>
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="description" content="Guess the pokedex." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
        </Head>
    );

    return i18nInstance ? (
        /* @ts-expect-error: Ignore no children prop error. */
        <StoreProvider store={Store}>
            <I18nextProvider i18n={i18nInstance}>
                <CustomHead />
                <Component {...pageProps} />
            </I18nextProvider>
        </StoreProvider>
    ) : (
        <CustomHead />
    );
};

export default App;
