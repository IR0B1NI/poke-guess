import React, { FunctionComponent } from 'react';

import { LocalizationProvider } from './helper/localization';
import MainScreen from './screens/mainScreen';

/**
 * Entry point of the mobile application.
 *
 * @returns {FunctionComponent} The main application.
 */
const App: FunctionComponent = () => {
    return (
        <LocalizationProvider>
            <MainScreen />
        </LocalizationProvider>
    );
};

export default App;
