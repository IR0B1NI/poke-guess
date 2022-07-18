import Pokedex, { Generation, NamedAPIResourceList } from 'pokedex-promise-v2';

import { IPokemon, IPokemonGeneration } from '../..';

// Singleton pokedex instance.
const P = new Pokedex();

/**
 * Fetch the list of available pokemon generations.
 *
 * @returns {IPokemonGeneration[]} The list of available pokemon generations.
 */
const fetchPokemonGenerations = async (): Promise<IPokemonGeneration[]> => {
    // Query all available generations.
    const result = (await P.getGenerationsList()) as NamedAPIResourceList;
    return result.results as IPokemonGeneration[];
};

/**
 * Get all pokemon models based on a given pokemon generation and a specified language.
 *
 * @param {string} generationName The pokemon generation name.
 * @param {string} languageKey The requested language key.
 * @returns {IPokemon[]} The list of pokemon models in the requested generation.
 */
const getPokemonForGeneration = async (generationName: string, languageKey: string) => {
    // Query the generation.
    const generation = (await P.getGenerationByName(generationName)) as Generation;
    // Retrieve the promises for the desired language pokemon models.
    const pokemonPromises = generation.pokemon_species.map(async (p) => {
        const pokemonSpecies = (await P.getPokemonSpeciesByName(p.name)) as Pokedex.PokemonSpecies;
        const nameForRequestedLanguage = pokemonSpecies.names.filter((pokeAPIName) => pokeAPIName.language.name === languageKey)[0].name;
        const pokemonModel: IPokemon = {
            id: pokemonSpecies.id,
            name: nameForRequestedLanguage,
        };
        return pokemonModel;
    });
    // Wait for everything to complete.
    const result = await Promise.all(pokemonPromises).then((result) => {
        // Order the result.
        result.sort((a, b) => (a.id < b.id ? -1 : 1));
        return result;
    });
    return result;
};

export { fetchPokemonGenerations, getPokemonForGeneration };
