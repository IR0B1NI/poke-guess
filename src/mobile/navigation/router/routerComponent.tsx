import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';

import MainScreen from '../screens/mainScreen';
import { gameNavKey } from './constants';

// Create bottom tab navigator.
const Tab = createBottomTabNavigator();

/**
 * The router to navigate between screens inside the application.
 *
 * @returns {FunctionComponent} The application router component.
 */
const Router: FunctionComponent = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={gameNavKey}>
                <Tab.Screen name={gameNavKey} component={MainScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Router;
