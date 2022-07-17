import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';

import { useTranslations } from '../../../helper/localization';
import { gameSettingsNavKey, settingsNavKey } from '../../router/constants';
import GameSettingsScreen from '../../screens/gameSettingsScreen';
import SettingsScreen from '../../screens/settingsScreen/settingsScreenComponent';

// Create the stack navigator for the settings screen.
const Stack = createStackNavigator();

/**
 * Stack navigator to navigate between screens on the settings route.
 *
 * @returns {FunctionComponent} The settings stack navigator component.
 */
const SettingsScreenStackNavigator: FunctionComponent = () => {
    /** Access to the translations. */
    const { translations } = useTranslations();

    return (
        <Stack.Navigator initialRouteName={settingsNavKey}>
            <Stack.Screen
                options={{
                    title: translations.settingsTitle,
                }}
                name={settingsNavKey}
                component={SettingsScreen}
            />
            <Stack.Screen name={gameSettingsNavKey} component={GameSettingsScreen} />
        </Stack.Navigator>
    );
};

export default SettingsScreenStackNavigator;
