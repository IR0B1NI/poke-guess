import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import { StyleProp, Text, TextStyle, useColorScheme } from 'react-native';

import styles from './styles';

interface ICustomTextProps {
    /** The children to render. */
    children?: ReactNode;
    /** The custom styles to apply. */
    style?: StyleProp<TextStyle>;
}

/**
 * Custom version of the react-native text component.
 *
 * @param {ICustomTextProps} props The custom text properties.
 * @returns {FunctionComponent} The custom text component.
 */
const CustomText: FunctionComponent<ICustomTextProps> = (props) => {
    /** Whether the dark mode is enabled or not. */
    const isDarkMode = useColorScheme() === 'dark';

    /** The computed general text styles based on the color scheme. */
    const generalStyle = useMemo(() => {
        let style = {
            ...styles.general,
        };
        if (isDarkMode) {
            style = {
                ...style,
                ...styles.dark,
            };
        } else {
            style = {
                ...style,
                ...styles.light,
            };
        }
        return style;
    }, [isDarkMode]);

    return <Text style={[generalStyle, props.style]}>{props.children}</Text>;
};

export default CustomText;
