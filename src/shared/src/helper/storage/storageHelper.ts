import { IPokemonGameSave, saveStoreKey } from '../..';

/**
 * Stores an item on the platform specific persistence storage using a defined key.
 *
 * @template T The type of the item to store.
 * @param {string} storageKey The key to use for storing the item.
 * @param {T} item The item to store.
 * @param {Function} setItem The platform specific function to store an item on the platform storage.
 */
const storeJson = async <T>(storageKey: string, item: T, setItem: (key: string, stringifiedItem: string) => void | Promise<void>): Promise<void> => {
    // Stringify the given item.
    const stringifiedItem = JSON.stringify(item);
    // Store the stringified item on the platform specific storage using the given storage key.
    await setItem(storageKey, stringifiedItem);
};

/**
 * Retrieves an item from the platform specific persistence storage.
 *
 * @template T The desired return type.
 * @param {string} storageKey The key of the item to retrieve.
 * @param {Function} getItem The platform specific function to retrieve an item from the platform storage.
 * @returns {T | undefined} The retrieved item parsed to the desired type if existent, undefined if not.
 */
const getFromStorage = async <T>(storageKey: string, getItem: (key: string) => string | null | Promise<string | null>): Promise<T | undefined> => {
    // Get the item from platform storage using the given storage key.
    const item = await getItem(storageKey);
    if (!item) {
        // If no item is stored with this key, return undefined.
        return undefined;
    }
    // Parse the item to the desired type.
    const parsedItem: T = JSON.parse(item);
    // Return the result.
    return parsedItem;
};

/**
 * Save the current progress of the game.
 *
 * @param {string[]} generationNames The names of the selected pokemon generations to use for the current game.
 * @param {string[]} foundPokemonNames The names of the successfully guessed pokemon.
 * @param {Function} setItem The platform specific function to store an item on the platform storage.
 */
const saveGameState = async (generationNames: string[], foundPokemonNames: string[], setItem: (key: string, stringifiedItem: string) => void | Promise<void>) => {
    const save: IPokemonGameSave = {
        generationNames: generationNames,
        foundPokemonNames: foundPokemonNames,
    };
    await storeJson(saveStoreKey, save, setItem);
};

export { getFromStorage, saveGameState, storeJson };
