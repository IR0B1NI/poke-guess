import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';

import { settingsNavKey } from '../../router/constants';
import SettingsScreen from './settingsScreenComponent';

const Stack = createStackNavigator();

const SettingsScreenStackNavigator: FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={settingsNavKey} component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export default SettingsScreenStackNavigator;
