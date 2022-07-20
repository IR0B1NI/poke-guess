import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';

import styles from './styles';

export interface IListOptionProps {
    /** The children to render inside. */
    children: ReactNode;
    /** Whether to render the border or not. */
    renderBorder?: boolean;
    /** The action to execute on press. */
    onPress?: () => void;
}

/**
 * Component to render a list option.
 *
 * @param {IListOptionProps} props The properties of the list option.
 * @returns {FunctionComponent} The list option component.
 */
const ListOption: FunctionComponent<IListOptionProps> = (props) => {
    /** Whether the dark mode is enabled or not. */
    const isDarkMode = useColorScheme() === 'dark';

    /** The visual content to render. */
    const content = useMemo(
        () => (
            <View style={styles.optionOuterContainer}>
                <View style={styles.optionInnerContainer}>{props.children}</View>
            </View>
        ),
        [props]
    );

    /** The computed border style based on props and theme. */
    const borderStyle = useMemo(() => {
        if (!props.renderBorder) {
            return {};
        }
        let style = {
            ...styles.border,
        };
        if (isDarkMode) {
            style = {
                ...style,
                ...styles.borderDark,
            };
        } else {
            style = {
                ...style,
                ...styles.borderLight,
            };
        }
        return style;
    }, [props.renderBorder, isDarkMode]);

    return <View style={borderStyle}>{props.onPress ? <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity> : content}</View>;
};

export default ListOption;
