import React, { FunctionComponent, useEffect } from 'react';
import { View } from 'react-native';

import CustomText from '../../../components/customText';
import { useTranslations } from '../../../helper/localization';
import { useStoreActions } from '../../../store';

/**
 * Screen component to render the game settings screen.
 *
 * @returns {FunctionComponent} The game settings screen.
 */
const GameSettingsScreen: FunctionComponent = () => {
    /** Access to the translations. */
    const { translations } = useTranslations();

    /** Action to update Whether the bottom nav bar is hidden or not. */
    const updateIsBottomNavBarHidden = useStoreActions((actions) => actions.ApplicationModel.updateIsBottomNavBarHidden);

    /** Hide the bottom nav bar on appearing and show it again when the component unmounts. */
    useEffect(() => {
        updateIsBottomNavBarHidden(true);
        return () => updateIsBottomNavBarHidden(false);
    }, [updateIsBottomNavBarHidden]);

    return (
        <View>
            <CustomText>{translations.gameSettingsTitle}</CustomText>
        </View>
    );
};

export default GameSettingsScreen;
