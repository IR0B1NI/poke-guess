import { StyleSheet } from 'react-native';

import colors from '../../theme/colors';

/** The styles of a pokemon card. */
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 20,
    },
    containerLight: {
        backgroundColor: colors.navBackgroundLight,
    },
    containerDark: {
        backgroundColor: colors.navBackgroundDark,
    },
    image: {
        alignSelf: 'center',
        height: 160,
        width: 160,
    },
    headline: {
        fontWeight: 'bold',
    },
});

export default styles;
