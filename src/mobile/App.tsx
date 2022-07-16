import React, { FunctionComponent } from 'react';

import LocalizationProvider from './helper/localization';
import Router from './navigation/router';

/**
 * Entry point of the mobile application.
 *
 * @returns {FunctionComponent} The main application.
 */
const App: FunctionComponent = () => {
    return (
        <LocalizationProvider>
            <Router />
        </LocalizationProvider>
    );
};

export default App;
