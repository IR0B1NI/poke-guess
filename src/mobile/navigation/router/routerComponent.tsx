import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

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
    const test = <Icon name="ios-person" color={'red'} />;
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={gameNavKey}>
                <Tab.Screen
                    name={gameNavKey}
                    component={MainScreen}
                    options={{
                        tabBarIcon: (props) => {
                            if (props.focused) {
                                return <Icon name="ios-person" color={'red'} />;
                            }
                            return <Icon name="ios-person" />;
                        },
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Router;
