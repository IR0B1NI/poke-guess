import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFromStorage, IPokemonGameSave, saveStoreKey } from 'poke-guess-shared';
import React, { FunctionComponent, ReactNode, useEffect } from 'react';

import { useStoreActions } from '../../store';

interface IStoreInitializerProps {
    /** The children to render. */
    children: ReactNode;
}

/**
 * Initializer component to init the redux store.
 *
 * @param {IStoreInitializerProps} props The store initializer properties.
 * @returns {FunctionComponent} The store initializer component.
 */
const StoreInitializer: FunctionComponent<IStoreInitializerProps> = (props) => {
    /** Action to update the game save model. */
    const updateGameSave = useStoreActions((actions) => actions.ApplicationModel.updateGameSave);

    /** Initialize the redux store. */
    useEffect(() => {
        const initGameState = async () => {
            try {
                const storedGameSave = await getFromStorage<IPokemonGameSave>(saveStoreKey, AsyncStorage.getItem);
                if (storedGameSave) {
                    updateGameSave({ ...storedGameSave });
                }
            } catch (error) {
                console.error(error);
            }
        };
        initGameState();
    }, [updateGameSave]);

    return <>{props.children}</>;
};

export default StoreInitializer;
