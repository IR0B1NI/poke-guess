// Import enumerations.
import { AlertType } from './enumerations/AlertType';
// Import helper.
import { calculateScore } from './helper/game';
import { fetchPokemonGenerations } from './helper/pokeApi';
import { getPokemonForGeneration } from './helper/pokeApi';
import { pokeApiDataCacheKey, saveStoreKey } from './helper/storage';
import { getFromStorage, saveGameState, storeJson } from './helper/storage';
// Import types.
import { IPokemon } from './types/IPokemon';
import { IPokemonApiCache } from './types/IPokemonApiCache';
import { IPokemonGameSave } from './types/IPokemonGameSave';
import { IPokemonGeneration } from './types/IPokemonGeneration';

// Export types.
export type { IPokemon, IPokemonApiCache, IPokemonGameSave, IPokemonGeneration };
// Export enumerations.
export { AlertType };
// Export constants.
export { pokeApiDataCacheKey, saveStoreKey };
// Export functions.
export { calculateScore, fetchPokemonGenerations, getFromStorage, getPokemonForGeneration, saveGameState, storeJson };
