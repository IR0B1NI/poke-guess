import { StyleSheet } from 'react-native';

import colors from '../../theme/colors';

/** Styles for the list option. */
const styles = StyleSheet.create({
    optionOuterContainer: {
        paddingTop: 12,
        paddingBottom: 12,
        marginLeft: 12,
        marginRight: 12,
    },
    optionInnerContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 6,
        paddingRight: 6,
    },
    border: {
        borderTopWidth: 0.2,
    },
    borderDark: {
        borderColor: colors.white,
    },
    borderLight: {
        borderColor: colors.black,
    },
});

export default styles;
