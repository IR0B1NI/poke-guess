import { StyleSheet } from 'react-native';

import colors from '../../../theme/colors';

/** The styles for the settings screen. */
const styles = StyleSheet.create({
    settingsContainer: {
        padding: 12,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconDark: {
        color: colors.white,
    },
    iconLight: {
        color: colors.black,
    },
});

export default styles;
