import { createStore, createTypedHooks } from 'easy-peasy';

import { ApplicationModel, IApplicationModel } from './models/applicationModel';

/**
 * Interface for the store model.
 */
export interface IStoreModel {
    ApplicationModel: IApplicationModel;
}

/**
 * Model that represents the store.
 */
const StoreModel: IStoreModel = {
    ApplicationModel,
};

// generate typed hooks
const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<IStoreModel>();

/**
 * The store.
 */
const store = createStore(StoreModel);

// offer typed hooks for consumers
export { useStore, useStoreActions, useStoreDispatch, useStoreState };

export default store;
