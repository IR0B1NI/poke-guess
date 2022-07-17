import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomText from '../../../components/customText';
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

    const mock = ['Spieleinstellungen', 'Spracheinstellungen'];

    return (
        <View>
            {mock.map((setting) => (
                <TouchableOpacity key={setting} onPress={() => navigation.navigate(gameSettingsNavKey)}>
                    <View style={styles.settingsContainer}>
                        <CustomText>{setting}</CustomText>
                        <Icon size={22} name="chevron-right" style={isDarkMode ? styles.iconDark : styles.iconLight} />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default SettingsScreen;
