/**
 * Stores an item on the platform specific persistence storage using a defined key.
 *
 * @template T The type of the item to store.
 * @param {string} storageKey The key to use for storing the item.
 * @param {T} item The item to store.
 * @param {Function} setItem The platform specific function to store an item on the platform storage.
 */
const storeJson = <T>(storageKey: string, item: T, setItem: (key: string, stringifiedItem: string) => void): void => {
    // Stringify the given item.
    const stringifiedItem = JSON.stringify(item);
    // Store the stringified item on the platform specific storage using the given storage key.
    setItem(storageKey, stringifiedItem);
};

/**
 * Retrieves an item from the platform specific persistence storage.
 *
 * @template T The desired return type.
 * @param {string} storageKey The key of the item to retrieve.
 * @param {Function} getItem The platform specific function to retrieve an item from the platform storage.
 * @returns {T | undefined} The retrieved item parsed to the desired type if existent, undefined if not.
 */
const getFromStorage = <T>(storageKey: string, getItem: (key: string) => string | null): T | undefined => {
    // Get the item from platform storage using the given storage key.
    const item = getItem(storageKey);
    if (!item) {
        // If no item is stored with this key, return undefined.
        return undefined;
    }
    // Parse the item to the desired type.
    const parsedItem: T = JSON.parse(item);
    // Return the result.
    return parsedItem;
};

export { getFromStorage, storeJson };
