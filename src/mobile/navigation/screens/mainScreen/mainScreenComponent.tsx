import React, { FunctionComponent } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import CustomText from '../../../components/customText';
import { useTranslations } from '../../../helper/localization';

/**
 * Screen component to render the main game screen.
 *
 * @returns {FunctionComponent} The main game screen.
 */
const MainScreen: FunctionComponent = () => {
    /** Access to the translations. */
    const { translations, changeLanguage } = useTranslations();

    return (
        <View style={styles.container}>
            <CustomText>{translations.welcomeMessage}</CustomText>
            <Button
                title="Toggle"
                onPress={() => {
                    if (translations.getLanguage() === 'en') {
                        changeLanguage('de');
                    } else {
                        changeLanguage('en');
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainScreen;
