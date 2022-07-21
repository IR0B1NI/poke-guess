import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomText from '../../../components/customText';
import ListOption from '../../../components/listOption';
import { useTranslations } from '../../../helper/localization';
import generalStyles from '../../../styles/generalStyles';
import { gameSettingsNavKey } from '../../router';
import { languageSettingsNavKey } from '../../router/constants';

/**
 * Screen component to render the settings screen.
 *
 * @returns {FunctionComponent} The settings screen.
 */
const SettingsScreen: FunctionComponent = () => {
    /** Access to translations. */
    const { translations } = useTranslations();
    /** Whether the dark mode is enabled or not. */
    const isDarkMode = useColorScheme() === 'dark';
    /** Access to the navigation. */
    const navigation = useNavigation<{ navigate: (key: string) => void }>();

    const settingsItems = [
        { key: gameSettingsNavKey, label: translations.gameSettingsTitle },
        { key: languageSettingsNavKey, label: translations.languageSettingsTitle },
    ];

    return (
        <View>
            {settingsItems.map((item) => (
                <ListOption key={item.key} renderBorder onPress={() => navigation.navigate(item.key)}>
                    <CustomText>{item.label}</CustomText>
                    <Icon size={22} name="chevron-right" style={isDarkMode ? generalStyles.iconDark : generalStyles.iconLight} />
                </ListOption>
            ))}
        </View>
    );
};

export default SettingsScreen;
