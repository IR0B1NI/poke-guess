import { RefreshIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, useState } from 'react';

import DefaultButton from '../../button/defaultButton';
import PrimaryButton from '../../button/primaryButton';
import TextInputGroup from '../../textInputGroup';

export interface IPokemonGameMenuProps {
    /** The callback to handle the user input. */
    handleUserInput: (userInputValue: string) => void;
    /** Callback to reset the game state and stored save. */
    resetGame?: () => void;
}

/**
 * The pokemon game menu.
 *
 * @param {IPokemonGameMenuProps} props The properties of the menu.
 * @returns {FunctionComponent} The pokemon game menu component.
 */
const PokemonGameMenu: FunctionComponent<IPokemonGameMenuProps> = (props) => {
    /** Access to translations. */
    const { t } = useTranslation();

    /** Whether to abort dialog is open or not. */
    const [isAbortDialogOpen, setIsAbortDialogOpen] = useState<boolean>(false);

    return (
        <div className="flex bg-green-300 p-5 w-full text-black">
            {isAbortDialogOpen && (
                <div className="card shadow-sm fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-green-300 w-96">
                    <div className="card-body">
                        <h2 className="card-title">{t('Pokemon_ResetDialog_Headline')}</h2>
                        <p>{t('Pokemon_ResetDialog_Text')}</p>
                        <div className="card-actions justify-end mt-7">
                            <DefaultButton
                                ariaLabel={t('PokemonGameMenu_ResetDialog_Confirm_Aria_Label')}
                                className="btn-error mr-7"
                                text={t('Pokemon_ResetDialog_Confirm')}
                                onClick={() => {
                                    if (props.resetGame) {
                                        props.resetGame();
                                    }
                                    setIsAbortDialogOpen(false);
                                }}
                            />
                            <DefaultButton
                                ariaLabel={t('PokemonGameMenu_ResetDialog_Abort_Aria_Label')}
                                text={t('Pokemon_ResetDialog_Abort')}
                                onClick={() => setIsAbortDialogOpen(false)}
                                className="text-white"
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-1">
                <TextInputGroup placeholder={t('Pokemon_Input_Placeholder')} submit={props.handleUserInput} />
                <PrimaryButton
                    ariaLabel={t('PokemonGameMenu_ResetButton_Aria_Label')}
                    text={t('Pokemon_ResetButton_Text')}
                    onClick={() => setIsAbortDialogOpen(true)}
                    className="ml-2 hidden sm:flex btn-error"
                />
                <button
                    aria-label={t('PokemonGameMenu_ResetButton_Aria_Label')}
                    className="ml-2 btn btn-error btn-square flex sm:hidden"
                    onClick={() => setIsAbortDialogOpen(true)}
                >
                    <RefreshIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default PokemonGameMenu;
