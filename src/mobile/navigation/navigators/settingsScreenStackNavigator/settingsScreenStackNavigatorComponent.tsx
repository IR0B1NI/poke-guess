import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';

import { useTranslations } from '../../../helper/localization';
import { gameSettingsNavKey, languageSettingsNavKey, settingsNavKey } from '../../router/constants';
import GameSettingsScreen from '../../screens/gameSettingsScreen';
import LanguageSettingsScreen from '../../screens/languageSettingsScreen';
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
        <Stack.Navigator
            initialRouteName={settingsNavKey}
            screenOptions={{
                headerBackTitle: translations.stackHeaderBackTitle,
            }}
        >
            <Stack.Screen
                options={{
                    title: translations.settingsTitle,
                }}
                name={settingsNavKey}
                component={SettingsScreen}
            />
            <Stack.Screen
                options={{
                    title: translations.gameSettingsTitle,
                }}
                name={gameSettingsNavKey}
                component={GameSettingsScreen}
            />
            <Stack.Screen
                options={{
                    title: translations.languageSettingsTitle,
                }}
                name={languageSettingsNavKey}
                component={LanguageSettingsScreen}
            />
        </Stack.Navigator>
    );
};

export default SettingsScreenStackNavigator;
