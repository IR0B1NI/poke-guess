import { IPokemon } from 'poke-guess-shared';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import CustomText from '../customText';

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
    return (
        <View>
            <CustomText>{props.pokemon.name && !props.hide ? props.pokemon.name : '?????'}</CustomText>
        </View>
    );
};

export default PokemonCard;
