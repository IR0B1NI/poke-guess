import { AlertType } from './enumerations/AlertType';
import { calculateScore } from './helper/game';
import { fetchPokemonGenerations } from './helper/pokeApi';
import { IPokemon } from './types/IPokemon';
import { IPokemonApiCache } from './types/IPokemonApiCache';
import { IPokemonGameSave } from './types/IPokemonGameSave';
import { IPokemonGeneration } from './types/IPokemonGeneration';

export type { IPokemon, IPokemonApiCache, IPokemonGameSave, IPokemonGeneration };

export { AlertType };
export { calculateScore, fetchPokemonGenerations };
