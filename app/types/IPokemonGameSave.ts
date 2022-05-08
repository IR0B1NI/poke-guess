/**
 * Represents the pokemon game save to store in the local storage.
 */
export interface IPokemonGameSave {
    /** The names of the selected generations for the game save. */
    generationNames: string[];
    /** The current state of the names of successfully guessed pokemons. */
    foundPokemonNames: string[];
}
