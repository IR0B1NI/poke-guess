import Pokedex, { NamedAPIResourceList } from 'pokedex-promise-v2';

import { IPokemonGeneration } from '../..';

/**
 * Fetch the list of available pokemon generations.
 *
 * @returns {IPokemonGeneration[]} The list of available pokemon generations.
 */
const fetchPokemonGenerations = async (): Promise<IPokemonGeneration[]> => {
    // If the cache has no data create pokedex instance.
    const P = new Pokedex();
    // Query all available generations.
    const result = (await P.getGenerationsList()) as NamedAPIResourceList;
    return result.results as IPokemonGeneration[];
};

export { fetchPokemonGenerations };
