import { fetchPokemonGenerations, getPokemonForGeneration, IPokemon, IPokemonGeneration } from 'poke-guess-shared';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { View } from 'react-native';

import CustomText from '../../../components/customText';
import { useTranslations } from '../../../helper/localization';
import { useStoreActions, useStoreState } from '../../../store';

/**
 * Screen component to render the main game screen.
 *
 * @returns {FunctionComponent} The main game screen.
 */
const MainScreen: FunctionComponent = () => {
    /** Access to the translations. */
    const { translations } = useTranslations();

    /** The game save model. */
    const gameSave = useStoreState((state) => state.ApplicationModel.gameSave);
    /** Action to update the game save model. */
    const updateGameSave = useStoreActions((actions) => actions.ApplicationModel.updateGameSave);

    /** The state of available pokemon generations. */
    const [generations, setGenerations] = useState<Map<string, IPokemon[]>>();
    /** The local state of pokemon to guess. */
    const [pokemonToFind, setPokemonToFind] = useState<IPokemon[]>([]);

    /** Fetch available generations */
    useEffect(() => {
        setGenerations(undefined);
        setPokemonToFind([]);
        const fetchData = async () => {
            try {
                const result: IPokemonGeneration[] = await fetchPokemonGenerations();
                const dict = new Map();
                result.forEach((gen: IPokemonGeneration) => {
                    dict.set(gen.name, []);
                });
                setGenerations(dict);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    /** Fetch the pokemon to guess based on the selected generations and the selected language. */
    useEffect(() => {
        const fetchData = async () => {
            const selectedGenerationNames = gameSave.generationNames;
            const desiredLanguage = translations.getLanguage();
            const result: IPokemon[] = [];
            // Fetch each selected generations pokemons and add them ro the result set.
            for (let i = 0; i < selectedGenerationNames.length; i++) {
                let genPokemons = generations?.get(selectedGenerationNames[i]);
                if (genPokemons && genPokemons.length <= 0) {
                    // If the generation has no stored pokemon in the dictionary, fetch them.
                    genPokemons = await getPokemonForGeneration(selectedGenerationNames[i], desiredLanguage);
                    generations?.set(selectedGenerationNames[i], genPokemons ? genPokemons : []);
                }
                genPokemons?.forEach((pokemon: IPokemon) => {
                    result.push(pokemon);
                });
            }
            // Order result set by pokedex id.
            result.sort((a, b) => (a.id > b.id ? 1 : -1));
            // Update the state.
            setPokemonToFind(result);
        };
        fetchData();
    }, [gameSave.generationNames, generations, translations]);

    return (
        <View>
            {pokemonToFind.map((pokemon) => (
                <View key={`pokemon-${pokemon.id}`}>
                    <CustomText>{pokemon.name}</CustomText>
                </View>
            ))}
        </View>
    );
};

export default MainScreen;
