import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action, action, Thunk, thunk } from 'easy-peasy';
import { IPokemonGameSave, saveGameState } from 'poke-guess-shared';

/**
 * Interface for the application model.
 */
export interface IApplicationModel {
    /** Whether the bottom nav bar is hidden or not. */
    isBottomNavBarHidden: boolean;
    /** Action to update Whether the bottom nav bar is hidden or not. */
    updateIsBottomNavBarHidden: Action<IApplicationModel, boolean>;
    /** The game save model. */
    gameSave?: IPokemonGameSave;
    /** Action to update the game save model. */
    updateGameSave: Action<IApplicationModel, IPokemonGameSave>;
    /** Action to update the game save model asynchronous. */
    updateGameSaveAsync: Thunk<IApplicationModel, IPokemonGameSave>;
}

/**
 * Initial state of the application model.
 */
export const ApplicationModel: IApplicationModel = {
    isBottomNavBarHidden: false,
    updateIsBottomNavBarHidden: action((state, payload) => {
        state.isBottomNavBarHidden = payload;
    }),
    gameSave: undefined,
    updateGameSave: action((state, payload) => {
        state.gameSave = payload;
    }),
    updateGameSaveAsync: thunk(async (actions, payload) => {
        actions.updateGameSaveAsync(payload);
        await saveGameState(payload.generationNames, payload.foundPokemonNames, AsyncStorage.setItem);
    }),
};
