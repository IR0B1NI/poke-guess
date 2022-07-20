import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPokemonGenerations, getFromStorage, IPokemon, IPokemonGameSave, IPokemonGeneration, saveGameState, saveStoreKey } from 'poke-guess-shared';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import CustomText from '../../../components/customText';
import ListOption from '../../../components/listOption';
import { useStoreActions } from '../../../store';

/**
 * Screen component to render the game settings screen.
 *
 * @returns {FunctionComponent} The game settings screen.
 */
const GameSettingsScreen: FunctionComponent = () => {
    /** Action to update Whether the bottom nav bar is hidden or not. */
    const updateIsBottomNavBarHidden = useStoreActions((actions) => actions.ApplicationModel.updateIsBottomNavBarHidden);

    /** The state of available pokemon generations. */
    const [generations, setGenerations] = useState<Map<string, IPokemon[]>>();
    /** The selected pokemon generation. */
    const [selectedGenerationNames, setSelectedGenerationNames] = useState<string[]>([]);

    /** Initially get the selected generations from device storage. */
    useEffect(() => {
        const fetchData = async () => {
            const save = await getFromStorage<IPokemonGameSave>(saveStoreKey, AsyncStorage.getItem);
            if (save?.generationNames) {
                setSelectedGenerationNames(save.generationNames);
            }
        };
        fetchData();
    }, []);

    /** Hide the bottom nav bar on appearing and show it again when the component unmounts. */
    useEffect(() => {
        updateIsBottomNavBarHidden(true);
        return () => updateIsBottomNavBarHidden(false);
    }, [updateIsBottomNavBarHidden]);

    /** Fetch the available pokemon generations. */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result: IPokemonGeneration[] = await fetchPokemonGenerations();
                const dict = new Map();
                result.forEach((gen: IPokemonGeneration) => {
                    dict.set(gen.name, []);
                });
                setGenerations(dict);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    /**
     * Add a generation to the list of selected generations if not yet added, remove it otherwise.
     *
     * @param {string} generationName The name of the generation to handle.
     */
    const toggleGenerationSelection = async (generationName: string) => {
        const newState = [...selectedGenerationNames];
        if (selectedGenerationNames.includes(generationName)) {
            // Remove the generation from the list of selected generations.
            const index = selectedGenerationNames.findIndex((v) => v === generationName);
            if (index !== -1) {
                newState.splice(index, 1);
                setSelectedGenerationNames([...newState]);
            }
        } else {
            // Add the generation to the list of selected generations.
            newState.push(generationName);
            setSelectedGenerationNames([...newState]);
        }
        await saveGameState([...newState], [], AsyncStorage.setItem);
    };

    return (
        <View>
            {generations && (
                <FlatList
                    scrollEnabled={false}
                    data={Array.from(generations.keys())}
                    renderItem={({ item, index }) => (
                        <ListOption renderBorder key={`generation-${index}`} onPress={() => toggleGenerationSelection(item)}>
                            <CustomText>{item}</CustomText>
                            <Switch value={selectedGenerationNames.includes(item)} onChange={() => toggleGenerationSelection(item)} />
                        </ListOption>
                    )}
                />
            )}
        </View>
    );
};

export default GameSettingsScreen;
