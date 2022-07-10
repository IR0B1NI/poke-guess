import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Pokedex, { Generation, NamedAPIResourceList } from 'pokedex-promise-v2';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import AutoDismissAlert from '../components/alerts/autoDismissAlert';
import CheckBox from '../components/checkBox';
import BasicLayout from '../components/layouts/basicLayout';
import PokemonGameMenu from '../components/menus/pokemonGameMenu';
import { AlertType } from '../types/AlertType';
import { IPokemon } from '../types/IPokemon';
import { IPokemonApiCache } from '../types/IPokemonApiCache';
import { IPokemonGameSave } from '../types/IPokemonGameSave';
import { IPokemonGeneration } from '../types/IPokemonGeneration';

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

    /** The abort controller to use. */
    const abortController = useRef<AbortController>();
    /** The name of the key in the local storage to store the current progress. */
    const saveStoreKey = 'PokemonGameSave';
    /** The name of the key in the local storage to store the poke api data cache.*/
    const pokeApiDataCacheKey = 'PokeApiData';

    /**
     * Get the poke api data cache model from local storage.
     *
     * @returns {IPokemonApiCache | undefined} The cached poke api data if any exists.
     */
    const getPokeApiDataFromCache = (): IPokemonApiCache | undefined => {
        // Try to retrieve cached poke api date.
        const cachedPokeApiDataString = localStorage.getItem(pokeApiDataCacheKey);
        if (!cachedPokeApiDataString) {
            return;
        }
        const cachedPokeApiData = JSON.parse(cachedPokeApiDataString) as IPokemonApiCache;
        return cachedPokeApiData;
    };

    /**
     * Fetch the list of available pokemon generations.
     *
     * @returns {Promise<IPokemonGeneration[]>} The list of available pokemon generations.
     */
    const fetchPokemonGenerations = async (): Promise<IPokemonGeneration[]> => {
        // If the cache has no data create pokedex instance.
        const P = new Pokedex();
        // Query all available generations.
        const result = (await P.getGenerationsList()) as NamedAPIResourceList;
        return result.results as IPokemonGeneration[];
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
        // Create pokedex instance.
        const P = new Pokedex();
        // Query the generation.
        const generation = (await P.getGenerationByName(genName)) as Generation;
        // Retrieve the promises for the desired language pokemon models.
        const pokemonPromises = generation.pokemon_species.map(async (p) => {
            const pokemonSpecies = (await P.getPokemonSpeciesByName(p.name)) as Pokedex.PokemonSpecies;
            const nameForRequestedLanguage = pokemonSpecies.names.filter((pokeAPIName) => pokeAPIName.language.name === languageKey)[0].name;
            const pokemonModel: IPokemon = {
                id: pokemonSpecies.id,
                name: nameForRequestedLanguage,
            };
            return pokemonModel;
        });
        // Wait for everything to complete.
        const result = await Promise.all(pokemonPromises).then((result) => {
            // Order the result.
            result.sort((a, b) => (a.id < b.id ? -1 : 1));
            return result;
        });
        if (!cachedGeneration || (cachedGeneration && (!cachedGeneration.pokemon[languageKey] || cachedGeneration.pokemon[languageKey].length <= 0))) {
            // If there is no cache for the current generation, or the cached generation contains no pokemon, fill the cache.
            const tmpCacheModel = { ...cache };
            if (!tmpCacheModel.generations) {
                // If there are no generations ion cache yet, init it.
                tmpCacheModel.generations = [];
            }
            const currentGenCache = tmpCacheModel.generations?.find((g) => g.name === generation.name);
            if (currentGenCache) {
                // If the current gen exists, add the pokemon for the requested language.
                currentGenCache.pokemon[languageKey] = result;
            } else {
                // Create gen model to add to cache.
                const genToAdd: IPokemonGeneration = {
                    name: generation.name,
                    pokemon: {},
                };
                genToAdd.pokemon[languageKey] = result;
                // Push new generation model to the cache.
                tmpCacheModel.generations.push(genToAdd);
            }
            // Update the cache in the local storage.
            localStorage.setItem(pokeApiDataCacheKey, JSON.stringify(tmpCacheModel));
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
        localStorage.setItem(saveStoreKey, JSON.stringify(save));
    };

    /**
     * Reset the current game save in the state and storage.
     */
    const resetGameState = () => {
        const save: IPokemonGameSave = {
            generationNames: [],
            foundPokemonNames: [],
        };
        localStorage.setItem(saveStoreKey, JSON.stringify(save));
        setFoundPokemon([]);
        setSelectedGenerationNames([]);
        setLastGuessedPokemon(undefined);
    };

    /** Handle game initialization based on stored save. */
    useEffect(() => {
        const storedSaveString = localStorage.getItem(saveStoreKey);
        if (!storedSaveString) {
            setSelectedGenerationNames([]);
            setFoundPokemon([]);
            return;
        }
        const save: IPokemonGameSave = JSON.parse(storedSaveString);
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
        // Check if the inserted value is valid.
        const pokemon = pokemonToFind.find((p) => p.name.toLowerCase() === userInputValue.toLowerCase().trim());
        const isInputValid = pokemon && !foundPokemon.includes(userInputValue);
        if (!isInputValid) {
            // If not, alert the user.
            setShowAlert(true);
        } else {
            // If yes, update the state.
            const newUserInputState = [...foundPokemon];
            newUserInputState.push(userInputValue.toLowerCase());
            setFoundPokemon([...newUserInputState]);
            setLastGuessedPokemon(pokemon);
            // Save the progress in the local storage.
            saveGameState(selectedGenerationNames, newUserInputState);
        }
    };

    /**
     * Determine the current user score by calculation the number of guessed pokemon names
     * that are present in the list of pokemons that needs to be guessed.
     *
     * @returns {number} The number of successfully guessed pokemon.
     */
    const calculateScore = (): number => {
        const result = pokemonToFind.filter((p) => foundPokemon.findIndex((fp) => fp.toLowerCase() === p.name.toLowerCase()) !== -1);
        return result.length;
    };

    return (
        <BasicLayout>
            <AutoDismissAlert type={AlertType.Error} text="Nope ..." show={showAlert} hide={() => setShowAlert(false)} />
            <div id="content-container" className="flex flex-1 flex-col h-screen sm:overflow-hidden mb-28 sm:mb-0">
                <div className="flex justify-center mt-24 mb-4">{`${t('Pokemon_CurrentProgress_Headline')}: ${calculateScore()} / ${pokemonToFind.length}`}</div>
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
                        {pokemonToFind.map((p, i) => (
                            <div className="min-w-max px-8 py-3" key={`pokemon-${i}`}>{`${p.id}. ${p.name && hasUserFoundPokemon(p.name) ? p.name : '?????'}`}</div>
                        ))}
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
