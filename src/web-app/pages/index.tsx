import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
    AlertType,
    calculateScore,
    fetchPokemonGenerations,
    getFromStorage,
    getPokemonForGeneration,
    IPokemon,
    IPokemonApiCache,
    IPokemonGameSave,
    IPokemonGeneration,
    pokeApiDataCacheKey,
    saveStoreKey,
    storeJson,
} from 'poke-guess-shared';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import AutoDismissAlert from '../components/alerts/autoDismissAlert';
import CheckBox from '../components/checkBox';
import BasicLayout from '../components/layouts/basicLayout';
import PokemonGameMenu from '../components/menus/pokemonGameMenu';

/**
 * The page component to render at "/".
 *
 * @returns {NextPage} The home page component.
 */
const Home: NextPage = () => {
    /** Access to translations. */
    const { t, i18n } = useTranslation();

    /** Whether the page is busy or not. */
    const [isBusy, setIsBusy] = useState<boolean>(false);
    /** The state of available pokemon generations. */
    const [generations, setGenerations] = useState<Map<string, IPokemon[]>>();
    /** The selected pokemon generation. */
    const [selectedGenerationNames, setSelectedGenerationNames] = useState<string[]>([]);
    /** The state of the fetched pokemon to remember. */
    const [pokemonToFind, setPokemonToFind] = useState<IPokemon[]>([]);
    /** The state of user input for pokemon names. */
    const [foundPokemon, setFoundPokemon] = useState<string[]>([]);
    /** The state of the last guessed pokemon. */
    const [lastGuessedPokemon, setLastGuessedPokemon] = useState<IPokemon>();
    /** Whether the alert must be shown or not. */
    const [showAlert, setShowAlert] = useState<boolean>(false);
    /** The current alert type. */
    const [alertType, setAlertType] = useState<AlertType>(AlertType.Error);
    /** The alert text. */
    const [alertText, setAlertText] = useState<string>();

    /** The abort controller to use. */
    const abortController = useRef<AbortController>();

    /**
     * Get the poke api data cache model from local storage.
     *
     * @returns {IPokemonApiCache | undefined} The cached poke api data if any exists.
     */
    const getPokeApiDataFromCache = (): IPokemonApiCache | undefined => {
        return getFromStorage<IPokemonApiCache>(pokeApiDataCacheKey, (key: string) => localStorage.getItem(key));
    };

    /**
     * Fetch the list of pokemon for a given pokemon generation with a requested language.
     *
     * @param {string} genName The name of the requested pokemon generation.
     * @param {string} languageKey The requested language of the pokemon names.
     * @returns {IPokemon[]} The list of pokemon in the requested generation.
     */
    const fetchPokemon = useCallback(async (genName: string, languageKey: string): Promise<IPokemon[]> => {
        // Retrieve the poke api data from cache.
        const cache = getPokeApiDataFromCache();
        // Check if the cache contains the needed data for the requested generation name.
        const cachedGeneration = cache?.generations.find((g) => g.name === genName);
        if (cachedGeneration && cachedGeneration.pokemon[languageKey] && cachedGeneration.pokemon[languageKey].length > 0) {
            // If a cached generation is found and it contains the list of pokemon, return the result.
            return cachedGeneration.pokemon[languageKey];
        }
        const result = await getPokemonForGeneration(genName, languageKey);
        if (!cachedGeneration || (cachedGeneration && (!cachedGeneration.pokemon[languageKey] || cachedGeneration.pokemon[languageKey].length <= 0))) {
            // If there is no cache for the current generation, or the cached generation contains no pokemon, fill the cache.
            const tmpCacheModel = { ...cache };
            if (!tmpCacheModel.generations) {
                // If there are no generations ion cache yet, init it.
                tmpCacheModel.generations = [];
            }
            const currentGenCache = tmpCacheModel.generations?.find((g) => g.name === genName);
            if (currentGenCache) {
                // If the current gen exists, add the pokemon for the requested language.
                currentGenCache.pokemon[languageKey] = result;
            } else {
                // Create gen model to add to cache.
                const genToAdd: IPokemonGeneration = {
                    name: genName,
                    pokemon: {},
                };
                genToAdd.pokemon[languageKey] = result;
                // Push new generation model to the cache.
                tmpCacheModel.generations.push(genToAdd);
            }
            // Update the cache in the local storage.
            storeJson(pokeApiDataCacheKey, tmpCacheModel, (key: string, stringifiedItem: string) => localStorage.setItem(key, stringifiedItem));
        }
        return result;
    }, []);

    /**
     * Save the current progress of the game.
     *
     * @param {string[]} generationNames The names of the selected pokemon generations to use for the current game.
     * @param {string[]} foundPokemonNames The names of the successfully guessed pokemon.
     */
    const saveGameState = (generationNames: string[], foundPokemonNames: string[]) => {
        const save: IPokemonGameSave = {
            generationNames: generationNames,
            foundPokemonNames: foundPokemonNames,
        };
        storeJson(saveStoreKey, save, (key: string, stringifiedItem: string) => localStorage.setItem(key, stringifiedItem));
    };

    /**
     * Reset the current game save in the state and storage.
     */
    const resetGameState = () => {
        const save: IPokemonGameSave = {
            generationNames: [],
            foundPokemonNames: [],
        };
        storeJson(saveStoreKey, save, (key: string, stringifiedItem: string) => localStorage.setItem(key, stringifiedItem));
        setFoundPokemon([]);
        setSelectedGenerationNames([]);
        setLastGuessedPokemon(undefined);
    };

    /** Handle game initialization based on stored save. */
    useEffect(() => {
        const save = getFromStorage<IPokemonGameSave>(saveStoreKey, (key: string) => localStorage.getItem(key));
        if (!save) {
            setSelectedGenerationNames([]);
            setFoundPokemon([]);
            return;
        }
        setSelectedGenerationNames(save.generationNames);
        setFoundPokemon(save.foundPokemonNames);
    }, []);

    /** Fetch available generations */
    useEffect(() => {
        setLastGuessedPokemon(undefined);
        setGenerations(undefined);
        setPokemonToFind([]);
        const fetchData = async () => {
            try {
                if (typeof window !== 'undefined') {
                    const result: IPokemonGeneration[] = await fetchPokemonGenerations();
                    const dict = new Map();
                    result.forEach((gen: IPokemonGeneration) => {
                        dict.set(gen.name, []);
                    });
                    setGenerations(dict);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [i18n.language]);

    /** Fetch the pokemon to use for the game. */
    useEffect(() => {
        if (!selectedGenerationNames || selectedGenerationNames.length < 1) {
            // If no generation is selected, reset state and return.
            setPokemonToFind([]);
            return;
        }
        // Reset states.
        setPokemonToFind([]);
        // Fetch the pokemon generation.
        const fetchData = async () => {
            // Abort possible previous requests.
            abortController?.current?.abort();
            // Create new abort controller.
            abortController.current = new AbortController();
            try {
                setIsBusy(true);
                if (typeof window !== 'undefined') {
                    const result: IPokemon[] = [];
                    // Fetch each selected generations pokemons and add them ro the result set.
                    for (let i = 0; i < selectedGenerationNames.length; i++) {
                        let genPokemons = generations?.get(selectedGenerationNames[i]);
                        if (genPokemons && genPokemons.length <= 0) {
                            // If the generation has no stored pokemon in the dictionary, fetch them.
                            genPokemons = await fetchPokemon(selectedGenerationNames[i], i18n.language);
                            generations?.set(selectedGenerationNames[i], genPokemons ? genPokemons : []);
                        }
                        genPokemons?.forEach((pokemon: IPokemon) => {
                            result.push(pokemon);
                        });
                    }
                    // Order result set by pokedex id.
                    result.sort((a, b) => (a.id > b.id ? 1 : -1));
                    // Update the state.
                    setPokemonToFind(result);
                    setIsBusy(false);
                }
            } catch (error) {
                console.error(error);
                if (error instanceof Error && !error.message.includes('The user aborted a request')) {
                    setIsBusy(false);
                }
            }
        };
        fetchData();
    }, [fetchPokemon, generations, i18n.language, selectedGenerationNames]);

    /**
     * Determines whether a pokemon is contained in the user guess list or not.
     *
     * @param {string} name The name of the pokemon to check.
     * @returns {boolean} True if yes, false if not.
     */
    const hasUserFoundPokemon = useCallback(
        (name: string) => {
            return foundPokemon.includes(name.toLowerCase());
        },
        [foundPokemon]
    );

    /**
     * Handle the user pokemon input.
     *
     * @param {string} userInputValue The user input.
     * @returns {void} Nothing.
     */
    const handleUserInput = (userInputValue: string) => {
        // Create a cleaned user input string.
        const userGuess = userInputValue.toLowerCase().trim();
        if (hasUserFoundPokemon(userGuess)) {
            // If the pokemon is already included in the list of found pokemon, inform the user and return.
            setAlertText(t('Alert_PokemonGuess_AlreadyFound'));
            setAlertType(AlertType.Info);
            setShowAlert(true);
            return;
        }
        // Try to find the exact match in the list.
        const pokemon = pokemonToFind.find((p) => p.name.toLowerCase() === userGuess);
        if (pokemon) {
            // The user has found a new pokemon, update the state.
            const newUserInputState = [...foundPokemon];
            newUserInputState.push(userGuess);
            setFoundPokemon([...newUserInputState]);
            setLastGuessedPokemon(pokemon);
            // Save the progress in the local storage.
            saveGameState(selectedGenerationNames, newUserInputState);
            // Scroll the new pokemon into the view.
            const scrollTarget = document.getElementById(`pokemon-${pokemon.id}`);
            if (scrollTarget) {
                scrollTarget.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
            return;
        }
        // Find out if the users guess was very close or not.
        const isClose = pokemonToFind.some((p) => {
            // Create comparable pokemon name.
            const pokemonName = p.name.toLocaleLowerCase();
            // Calculate the difference between pokemon name and user input.
            const lengthDifference = userGuess.length - pokemonName.length;
            if (lengthDifference > 1 || lengthDifference < -1) {
                // If the difference is too big, return false.
                return false;
            }
            let differentCharacters = 0;
            Array.from(pokemonName).forEach((char, i) => {
                if (userGuess.charAt(i) !== char) {
                    differentCharacters++;
                }
            });
            if (differentCharacters > 1) {
                return false;
            }
            return true;
        });
        if (isClose) {
            // If the guess is close, inform the user.
            setAlertType(AlertType.Warning);
            setAlertText(t('Alert_PokemonGuess_Close'));
            setShowAlert(true);
            return;
        } else {
            // If the guess is not close, display error.
            setAlertType(AlertType.Error);
            setAlertText(t('Alert_PokemonGuess_Error'));
            setShowAlert(true);
            return;
        }
    };

    return (
        <BasicLayout>
            <AutoDismissAlert type={alertType} text={alertText ?? ''} show={showAlert} hide={() => setShowAlert(false)} />
            <div id="content-container" className="flex flex-1 flex-col h-screen sm:overflow-hidden mb-28 sm:mb-0">
                <div className="flex justify-center mt-24 mb-4">{`${t('Pokemon_CurrentProgress_Headline')}: ${calculateScore(pokemonToFind, foundPokemon)} / ${
                    pokemonToFind.length
                }`}</div>
                <div className="flex overflow-x-auto min-h-16">
                    {generations?.keys &&
                        Array.from(generations.keys()).map((generationName, i) => (
                            <div key={`generation-${i}`} className="flex p-4 justify-center items-center min-w-max">
                                <CheckBox
                                    ariaLabel={generationName}
                                    disabled={isBusy}
                                    value={generationName}
                                    text={generationName}
                                    checked={selectedGenerationNames.includes(generationName)}
                                    onChange={(event) => {
                                        const checked = event.target.checked;
                                        if (checked && generationName) {
                                            // Add to state.
                                            const newState = [...selectedGenerationNames];
                                            newState.push(generationName);
                                            setSelectedGenerationNames([...newState]);
                                            saveGameState(newState, foundPokemon);
                                        } else {
                                            // Remove from state.
                                            const index = selectedGenerationNames.findIndex((v) => v === generationName);
                                            if (index !== -1) {
                                                const newState = [...selectedGenerationNames];
                                                newState.splice(index, 1);
                                                setSelectedGenerationNames([...newState]);
                                                saveGameState(newState, foundPokemon);
                                            }
                                        }
                                    }}
                                />
                            </div>
                        ))}
                </div>
                <div className="flex flex-1 flex-col sm:overflow-y-auto">
                    <div>
                        {pokemonToFind.map((p, i) => {
                            const hasFoundPokemon = hasUserFoundPokemon(p.name);
                            return (
                                <div className="card bg-base-200 shadow-sm m-5 max-w-max" key={`pokemon-${i}`}>
                                    <div className="card-body">
                                        <div id={`pokemon-${p.id}`}>{`${p.id}. ${p.name && hasFoundPokemon ? p.name : '?????'}`}</div>
                                        {hasFoundPokemon && (
                                            <div>
                                                <Image
                                                    height={160}
                                                    width={160}
                                                    alt={p.name}
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {lastGuessedPokemon && (
                    <div className="card fixed top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 bg-base-200 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">{t('LastGuessedPokemon_Headline')}</h2>
                            <Image
                                height={320}
                                width={320}
                                alt={lastGuessedPokemon.name}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${lastGuessedPokemon.id}.png`}
                            />
                            <div className="flex justify-center">{`${lastGuessedPokemon.id}. ${lastGuessedPokemon.name}`}</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full fixed bottom-0 sm:relative">
                <PokemonGameMenu handleUserInput={handleUserInput} resetGame={resetGameState} />
            </div>
        </BasicLayout>
    );
};

/**
 * Server side executed method to inject properties into the component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default Home;
