import React, { FunctionComponent } from 'react';
import { FlatList, useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LanguageLabel from '../../../components/languageLabel/languageLabel';
import ListOption from '../../../components/listOption';
import { useTranslations } from '../../../helper/localization';
import generalStyles from '../../../styles/generalStyles';

/**
 * Screen component to render the language settings screen.
 *
 * @returns {FunctionComponent} The language settings screen component.
 */
const LanguageSettingsScreen: FunctionComponent = () => {
    /** Whether the dark mode is enabled or not. */
    const isDarkMode = useColorScheme() === 'dark';
    /** Access to translations. */
    const { translations, changeLanguage } = useTranslations();

    /** The list of available language keys. */
    const availableLanguages = translations.getAvailableLanguages();

    return (
        <View>
            <FlatList
                scrollEnabled={false}
                data={availableLanguages}
                renderItem={({ item, index }) => (
                    <ListOption renderBorder key={`generation-${index}`} onPress={async () => await changeLanguage(item)}>
                        <LanguageLabel languageKey={item} />
                        {item === translations.getLanguage() && <Icon name="check" size={15} style={isDarkMode ? generalStyles.iconDark : generalStyles.iconLight} />}
                    </ListOption>
                )}
            />
        </View>
    );
};

export default LanguageSettingsScreen;
