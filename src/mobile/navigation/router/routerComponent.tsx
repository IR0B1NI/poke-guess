import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { useColorScheme } from 'react-native';

import colors from '../../theme/colors';
import MainTabNavigator from '../navigators/mainTabNavigator';

/**
 * The router to navigate between screens inside the application.
 *
 * @returns {FunctionComponent} The application router component.
 */
const Router: FunctionComponent = () => {
    /** Whether the dark mode is enabled or not. */
    const isDarkMode = useColorScheme() === 'dark';

    /** Build the app theme. */
    const theme: Theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: isDarkMode ? colors.backgroundDark : colors.backgroundLight,
            card: isDarkMode ? colors.navBackgroundDark : colors.navBackgroundLight,
            text: isDarkMode ? colors.white : colors.black,
            primary: colors.primary,
        },
    };

    return (
        <NavigationContainer theme={theme}>
            <MainTabNavigator />
        </NavigationContainer>
    );
};

export default Router;
