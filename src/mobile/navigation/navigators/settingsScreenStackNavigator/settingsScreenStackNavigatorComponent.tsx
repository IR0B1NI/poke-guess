import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';

import { settingsNavKey } from '../../router/constants';
import SettingsScreen from '../../screens/settingsScreen/settingsScreenComponent';

// Create the stack navigator for the settings screen.
const Stack = createStackNavigator();

/**
 * Stack navigator to navigate between screens on the settings route.
 *
 * @returns {FunctionComponent} The settings stack navigator component.
 */
const SettingsScreenStackNavigator: FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={settingsNavKey} component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export default SettingsScreenStackNavigator;
