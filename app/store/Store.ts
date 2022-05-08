import { createStore, createTypedHooks } from 'easy-peasy';
import { UserModel, IUserModel } from './model/UserModel';

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
export { useStoreActions, useStoreState, useStoreDispatch, useStore };

/**
 * The store.
 */
export const Store = createStore(StoreModel);
