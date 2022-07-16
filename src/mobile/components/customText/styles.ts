import { StyleSheet } from 'react-native';

import colors from '../../theme/colors';

/** The styles for the custom text component. */
const styles = StyleSheet.create({
    general: {
        fontSize: 14,
    },
    light: {
        color: colors.black,
    },
    dark: {
        color: colors.white,
    },
});

export default styles;
