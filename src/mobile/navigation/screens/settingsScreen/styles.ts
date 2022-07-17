import { StyleSheet } from 'react-native';

import colors from '../../../theme/colors';

/** The settings screen styles. */
const styles = StyleSheet.create({
    linkContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
    },
    linkIconDark: {
        color: colors.white,
    },
    linkIconLight: {
        color: colors.black,
    },
});

export default styles;
