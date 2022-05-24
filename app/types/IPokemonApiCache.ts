import { IPokemonGeneration } from "./IPokemonGeneration";

/**
 * Model for a poke api data cache.
 */
export interface IPokemonApiCache {
    /** All available pokemon generations. */
    generations: IPokemonGeneration[];    
}