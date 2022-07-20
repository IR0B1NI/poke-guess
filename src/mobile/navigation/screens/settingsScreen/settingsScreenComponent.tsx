import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomText from '../../../components/customText';
import ListOption from '../../../components/listOption';
import { useTranslations } from '../../../helper/localization';
import { gameSettingsNavKey } from '../../router';
import styles from './styles';

/**
 * Screen component to render the settings screen.
 *
 * @returns {FunctionComponent} The settings screen.
 */
const SettingsScreen: FunctionComponent = () => {
    /** Whether the dark mode is enabled or not. */
    const isDarkMode = useColorScheme() === 'dark';
    /** Access to the translations. */
    const { translations } = useTranslations();
    /** Access to the navigation. */
    const navigation = useNavigation<{ navigate: (key: string) => void }>();

    const settingsKeys = ['Game-Settings', 'Language Settings'];

    return (
        <View>
            {settingsKeys.map((key) => (
                <ListOption key={key} renderBorder onPress={() => navigation.navigate(gameSettingsNavKey)}>
                    <CustomText>{key}</CustomText>
                    <Icon size={22} name="chevron-right" style={isDarkMode ? styles.iconDark : styles.iconLight} />
                </ListOption>
            ))}
        </View>
    );
};

export default SettingsScreen;
