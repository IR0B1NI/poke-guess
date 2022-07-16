import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import React, { FunctionComponent, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTranslations } from '../../helper/localization';
import colors from '../../theme/colors';
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
    /** Whether the dark mode is enabled or not. */
    const isDarkMode = useColorScheme() === 'dark';
    /** Access to the translations. */
    const { translations } = useTranslations();

    /** Build the app theme. */
    const theme: Theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: isDarkMode ? colors.black : colors.white,
            card: isDarkMode ? colors.black : colors.white,
            text: isDarkMode ? colors.white : colors.black,
            primary: colors.primary,
        },
    };

    /**
     * Render an icon for a tab bar item.
     *
     * @param {boolean} isFocused Whether the icon needs to display a focused state or not.
     * @param {string} iconName The name of the icon.
     * @returns {ReactNode} The icon component.
     */
    const renderTabBarIcon = (isFocused: boolean, iconName: string) => {
        if (isFocused) {
            return <Icon name={iconName} color={colors.primary} />;
        }
        return <Icon name={iconName} color={isDarkMode ? colors.white : colors.black} />;
    };

    return (
        <NavigationContainer theme={theme}>
            <Tab.Navigator initialRouteName={gameNavKey}>
                <Tab.Screen
                    name={gameNavKey}
                    component={MainScreen}
                    options={{
                        title: translations.gameTitle,
                        tabBarIcon: (props) => renderTabBarIcon(props.focused, 'game-controller'),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Router;
