import { StyleSheet } from 'react-native';

/** Styles of the game menu. */
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
        paddingRight: 6
    },
    optionBorderTop: {
        borderTopWidth: 0.3,
    },
});

export default styles;
