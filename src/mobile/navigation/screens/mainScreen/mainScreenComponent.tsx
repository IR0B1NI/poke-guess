import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import CustomText from '../../../components/customText';
import { useTranslations } from '../../../helper/localization';

/**
 * Screen component to render the main game screen.
 *
 * @returns {FunctionComponent} The main game screen.
 */
const MainScreen: FunctionComponent = () => {
    /** Access to the translations. */
    const { translations } = useTranslations();

    return (
        <View>
            <CustomText>{translations.welcomeMessage}</CustomText>
        </View>
    );
};

export default MainScreen;
