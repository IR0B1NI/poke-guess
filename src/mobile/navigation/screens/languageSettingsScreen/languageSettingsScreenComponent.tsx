import React, { FunctionComponent } from 'react';
import { FlatList, View } from 'react-native';

import CustomText from '../../../components/customText';
import ListOption from '../../../components/listOption';

/**
 * Screen component to render the language settings screen.
 *
 * @returns {FunctionComponent} The language settings screen component.
 */
const LanguageSettingsScreen: FunctionComponent = () => {
    return (
        <View>
            <FlatList
                scrollEnabled={false}
                data={[]}
                renderItem={({ item, index }) => (
                    <ListOption renderBorder key={`generation-${index}`}>
                        <CustomText>text</CustomText>
                    </ListOption>
                )}
            />
        </View>
    );
};

export default LanguageSettingsScreen;
