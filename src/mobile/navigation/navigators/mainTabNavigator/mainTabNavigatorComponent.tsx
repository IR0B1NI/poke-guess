import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactNode } from 'react';
import { FunctionComponent } from 'react';
import { useColorScheme } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import IconNameSpace from '../../../enumerations/IconNameSpace';
import { useTranslations } from '../../../helper/localization';
import colors from '../../../theme/colors';
import { gameNavKey, settingsStackNavKey } from '../../router';
import MainScreen from '../../screens/mainScreen';
import SettingsScreenStackNavigator from '../settingsScreenStackNavigator';

// Create the main tab navigator.
const Tab = createBottomTabNavigator();

/**
 * The applications main tab navigator.
 *
 * @returns {FunctionComponent} The tab navigator component.
 */
const MainTabNavigator: FunctionComponent = () => {
    /** Whether the dark mode is enabled or not. */
    const isDarkMode = useColorScheme() === 'dark';
    /** Access to the translations. */
    const { translations } = useTranslations();

    /**
     * Render an icon for a tab bar item.
     *
     * @param {boolean} isFocused Whether the icon needs to display a focused state or not.
     * @param {string} iconName The name of the icon.
     * @param {IconNameSpace} iconNameSpace The namespace of the icon to use.
     * @returns {ReactNode} The icon component.
     */
    const renderTabBarIcon = (isFocused: boolean, iconName: string, iconNameSpace: IconNameSpace) => {
        switch (iconNameSpace) {
            case IconNameSpace.MaterialCommunityIcons:
                return <MaterialCommunityIcon size={22} name={iconName} color={isFocused ? colors.primary : isDarkMode ? colors.white : colors.black} />;
            case IconNameSpace.MaterialIcons:
                return <MaterialIcon size={22} name={iconName} color={isFocused ? colors.primary : isDarkMode ? colors.white : colors.black} />;
            default:
                return <></>;
        }
    };

    return (
        <Tab.Navigator initialRouteName={gameNavKey}>
            <Tab.Screen
                name={gameNavKey}
                component={MainScreen}
                options={{
                    title: translations.gameTitle,
                    tabBarIcon: (props) => renderTabBarIcon(props.focused, 'pokeball', IconNameSpace.MaterialCommunityIcons),
                }}
            />
            <Tab.Screen
                name={settingsStackNavKey}
                component={SettingsScreenStackNavigator}
                options={{
                    headerShown: false,
                    title: translations.settingsTitle,
                    tabBarIcon: (props) => renderTabBarIcon(props.focused, 'settings', IconNameSpace.MaterialIcons),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
