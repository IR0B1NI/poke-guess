import { IPokemon } from './IPokemon';

/**
 * Represents a single pokemon generation.
 */
export interface IPokemonGeneration {
    /** The display name. */
    name: string;
    /** The api url. */
    url?: string;
    /** The pokemon in this generation per language key. */
    pokemon: { [lng: string]: IPokemon[] };
}
