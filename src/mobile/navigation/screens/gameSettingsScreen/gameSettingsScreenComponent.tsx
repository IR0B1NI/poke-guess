import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import CustomText from '../../../components/customText';
import { useTranslations } from '../../../helper/localization';

/**
 * Screen component to render the game settings screen.
 *
 * @returns {FunctionComponent} The game settings screen.
 */
const GameSettingsScreen: FunctionComponent = () => {
    /** Access to the translations. */
    const { translations } = useTranslations();

    return (
        <View>
            <CustomText>{translations.gameSettingsTitle}</CustomText>
        </View>
    );
};

export default GameSettingsScreen;
