import React, { FunctionComponent } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { useTranslations } from '../../helper/localization/localizationProvider';

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
            <Text>{translations.welcomeMessage}</Text>
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
