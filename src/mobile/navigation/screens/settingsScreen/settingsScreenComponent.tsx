import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { useTranslations } from '../../../helper/localization';

/**
 * Screen component to render the settings screen.
 *
 * @returns {FunctionComponent} The settings screen.
 */
const SettingsScreen: FunctionComponent = () => {
    /** Access to the translations. */
    const { translations } = useTranslations();

    return <View></View>;
};

export default SettingsScreen;
