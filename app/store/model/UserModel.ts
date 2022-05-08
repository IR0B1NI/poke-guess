import { Action, action } from 'easy-peasy';
import { IUserSettings } from '../../types/IUserSettings';

/** The key to access the stored user settings in the browser storage. */
const userSettingsStorageKey = 'userSettings';

/**
 * Interface for the user model.
 */
export interface IUserModel {
    /** The user settings to store in the browser storage. */
    userSettings: IUserSettings | undefined;
    /** Action to update the stored user settings. */
    updateUserSettings: Action<IUserModel, IUserSettings>;
}

/**
 * Initial state of the user model.
 */
export const UserModel: IUserModel = {
    userSettings: undefined,
    updateUserSettings: action((state, payload) => {
        // Update the settings state.
        state.userSettings = payload;
        // Update the settings stored in the browser storage.
        localStorage.setItem(userSettingsStorageKey, JSON.stringify(state.userSettings));
    }),
};
