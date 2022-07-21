import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import CustomText from '../customText';

export interface ILanguageLabelProps {
    /** The key of the language. */
    languageKey: string;
}

/**
 * Component to display a language by it's key.
 *
 * @param {ILanguageLabelProps} props The language label properties.
 * @returns {FunctionComponent} The language label component.
 */
const LanguageLabel: FunctionComponent<ILanguageLabelProps> = (props) => {
    switch (props.languageKey) {
        case 'en':
            return (
                <View>
                    <CustomText>🇺🇸 English</CustomText>
                </View>
            );
        case 'de':
            return (
                <View>
                    <CustomText>🇩🇪 Deutsch</CustomText>
                </View>
            );
        default:
            return (
                <View>
                    <CustomText>UNSUPPORTED LANGUAGE KEY</CustomText>
                </View>
            );
    }
};

export default LanguageLabel;
