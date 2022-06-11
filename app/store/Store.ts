import { createStore, createTypedHooks } from 'easy-peasy';

import { IUserModel, UserModel } from './model/UserModel';

/**
 * Interface for the store model.
 */
export interface IStoreModel {
    /** The model for stored information about the current user. */
    UserModel: IUserModel;
}

/**
 * Model that represents the store.
 */
const StoreModel: IStoreModel = {
    UserModel,
};

// generate typed hooks
const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<IStoreModel>();

// offer typed hooks for consumers
export { useStore,useStoreActions, useStoreDispatch, useStoreState };

/**
 * The store.
 */
export const Store = createStore(StoreModel);
