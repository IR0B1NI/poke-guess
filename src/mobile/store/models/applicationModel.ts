import { Action, action } from 'easy-peasy';
import { IPokemonGameSave } from 'poke-guess-shared';

/**
 * Interface for the application model.
 */
export interface IApplicationModel {
    /** The current application language. */
    language?: string;
    /** Update the current application language. */
    updateLanguage: Action<IApplicationModel, string>;
    /** Whether the bottom nav bar is hidden or not. */
    isBottomNavBarHidden: boolean;
    /** Action to update Whether the bottom nav bar is hidden or not. */
    updateIsBottomNavBarHidden: Action<IApplicationModel, boolean>;
    /** The game save model. */
    gameSave: IPokemonGameSave;
    /** Action to update the game save model. */
    updateGameSave: Action<IApplicationModel, IPokemonGameSave>;
}

/**
 * Initial state of the application model.
 */
export const ApplicationModel: IApplicationModel = {
    language: undefined,
    updateLanguage: action((state, payload) => {
        state.language = payload;
    }),
    isBottomNavBarHidden: false,
    updateIsBottomNavBarHidden: action((state, payload) => {
        state.isBottomNavBarHidden = payload;
    }),
    gameSave: { foundPokemonNames: [], generationNames: [] },
    updateGameSave: action((state, payload) => {
        state.gameSave = payload;
    }),
};
