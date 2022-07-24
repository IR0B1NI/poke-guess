import { IPokemon } from 'poke-guess-shared';
import React, { FunctionComponent } from 'react';
import { Image, useColorScheme, View } from 'react-native';

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
            <CustomText style={styles.headline}>{props.pokemon.name && `${props.pokemon.id}. ${!props.hide ? props.pokemon.name : '?????'}`}</CustomText>
            <Image style={styles.image} source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png` }} />
        </View>
    );
};

export default PokemonCard;
