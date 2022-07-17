import { Action, action } from 'easy-peasy';

/**
 * Interface for the application model.
 */
export interface IApplicationModel {
    /** Whether the bottom nav bar is hidden or not. */
    isBottomNavBarHidden: boolean;
    /** Action to update Whether the bottom nav bar is hidden or not. */
    updateIsBottomNavBarHidden: Action<IApplicationModel, boolean>;
}

/**
 * Initial state of the application model.
 */
export const ApplicationModel: IApplicationModel = {
    isBottomNavBarHidden: false,
    updateIsBottomNavBarHidden: action((state, payload) => {
        state.isBottomNavBarHidden = payload;
    }),
};
