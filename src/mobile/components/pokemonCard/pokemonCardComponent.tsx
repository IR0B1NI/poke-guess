import { IPokemon } from 'poke-guess-shared';
import React, { FunctionComponent } from 'react';
import { useColorScheme, View } from 'react-native';

import CustomText from '../customText';
import styles from './styles';

export interface IPokemonCardProps {
    /** The pokemon to display. */
    pokemon: IPokemon;
    /** Whether to hide pokemon information or not. */
    hide: boolean;
}

/**
 * Card component to display a single pokemon.
 *
 * @param {IPokemonCardProps} props The pokemon card properties.
 * @returns {FunctionComponent} The pokemon card component.
 */
const PokemonCard: FunctionComponent<IPokemonCardProps> = (props) => {
    /** Whether the dark mode is enabled or not. */
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
            <CustomText>{props.pokemon.name && !props.hide ? props.pokemon.name : '?????'}</CustomText>
        </View>
    );
};

export default PokemonCard;
