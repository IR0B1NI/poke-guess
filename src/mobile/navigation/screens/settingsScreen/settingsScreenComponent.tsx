import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { Button, View } from 'react-native';

import { useTranslations } from '../../../helper/localization';
import { gameSettingsNavKey } from '../../router';

/**
 * Screen component to render the settings screen.
 *
 * @returns {FunctionComponent} The settings screen.
 */
const SettingsScreen: FunctionComponent = () => {
    /** Access to the translations. */
    const { translations } = useTranslations();

    const navigation = useNavigation<any>();

    return (
        <View>
            <Button title="test" onPress={() => navigation.navigate(gameSettingsNavKey)} />
        </View>
    );
};

export default SettingsScreen;
