import { StoreProvider } from 'easy-peasy';
import React, { FunctionComponent } from 'react';

import LocalizationProvider from './helper/localization';
import Router from './navigation/router';
import store from './store';

/**
 * Entry point of the mobile application.
 *
 * @returns {FunctionComponent} The main application.
 */
const App: FunctionComponent = () => {
    return (
        /* @ts-expect-error: Ignore no children prop error. */
        <StoreProvider store={store}>
            <LocalizationProvider>
                <Router />
            </LocalizationProvider>
        </StoreProvider>
    );
};

export default App;
