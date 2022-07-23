import { StyleSheet } from 'react-native';

import colors from '../../theme/colors';

/** The styles of a pokemon card. */
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 20,
        height: 100,        
    },
    containerLight: {
        backgroundColor: colors.navBackgroundLight,
    },
    containerDark: {
        backgroundColor: colors.navBackgroundDark,
    },
});

export default styles;
