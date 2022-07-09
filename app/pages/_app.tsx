import '../styles/global-styles.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';

/**
 * The main entry point of the next js application.
 *
 * @param {AppProps} param0 The properties of the app component.
 * @returns {FunctionComponent} The application component.
 */
const App: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => {
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
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta name="robots" content="index, follow" />
        </Head>
    );

    return (
        <>
            <CustomHead />
            <Component {...pageProps} />
        </>
    );
};

export default appWithTranslation(App);
