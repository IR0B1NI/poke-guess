import { IPokemon } from '../..';

/**
 * Determine the current user score by calculation the number of guessed pokemon names
 * that are present in the list of pokemons that needs to be guessed.
 *
 * @param {IPokemon[]} pokemonToFind The list of pokemon to find to win the game.
 * @param {string[]} foundPokemonNames The list of pokemon names that are found by the user in the current game state.
 * @returns {number} The number of successfully guessed pokemon.
 */
const calculateScore = (pokemonToFind: IPokemon[], foundPokemonNames: string[]): number => {
    const result = pokemonToFind.filter((p) => foundPokemonNames.findIndex((fp) => fp.toLowerCase() === p.name.toLowerCase()) !== -1);
    return result.length;
};

export { calculateScore };
