import React, { FunctionComponent, KeyboardEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from '../button/DefaultButton';
import { PrimaryButton } from '../button/PrimaryButton';
import { TextField } from '../TextField';

export interface IPokemonGameMenuProps {
    /** The callback to handle the user input. */
    handleUserInput: (userInputValue: string) => void;
    /** The current  */
    currentScore?: number;
    /** The maximum possible score. */
    maxScore?: number;
    /** Callback to reset the game state and stored save. */
    resetGame?: () => void;
}

/**
 * The pokemon game menu.
 *
 * @param {IPokemonGameMenuProps} props The properties of the menu.
 * @returns {FunctionComponent} The pokemon game menu component.
 */
export const PokemonGameMenu: FunctionComponent<IPokemonGameMenuProps> = (props) => {
    /** Access to translations. */
    const { t } = useTranslation();

    /** The current input of the user in the text field. */
    const [currentUserInput, setCurrentUserInput] = useState<string>('');
    /** Whether to abort dialog is open or not. */
    const [isAbortDialogOpen, setIsAbortDialogOpen] = useState<boolean>(false);

    return (
        <div className="bg-green-300 text-white fixed bottom-10 right-10 flex flex-col rounded-xl p-10 w-96 z-50">
            {isAbortDialogOpen && (
                <div className="flex rounded-lg shadow-sm flex-col p-4 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-green-300 w-96 h-52">
                    <h4>{t('Pokemon_ResetDialog_Headline')}</h4>
                    <div className="mt-7">{t('Pokemon_ResetDialog_Text')}</div>
                    <div className="flex justify-end items-center mt-auto">
                        <PrimaryButton
                            className="bg-red-700 mr-7"
                            text={t('Pokemon_ResetDialog_Confirm')}
                            onClick={() => {
                                if (props.resetGame) {
                                    props.resetGame();
                                }
                                setIsAbortDialogOpen(false);
                            }}
                        />
                        <DefaultButton text={t('Pokemon_ResetDialog_Abort')} onClick={() => setIsAbortDialogOpen(false)} />
                    </div>
                </div>
            )}
            <TextField
                placeholder={t('Pokemon_Input_Placeholder')}
                value={currentUserInput}
                onChange={(newValue) => setCurrentUserInput(newValue)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                    // Check if the user pressed enter to confirm the current input.
                    if (event.key !== 'Enter') {
                        return;
                    }
                    // Execute the callback to handle the current user input.
                    props.handleUserInput(currentUserInput);
                    // Reset the state of the users input.
                    setCurrentUserInput('');
                }}
            />
            <div className="flex justify-center mt-8">
                <h4>{t('Pokemon_CurrentProgress_Headline')}</h4>
            </div>
            <div className="flex justify-center mt-4 text-5xl">
                {props.currentScore} / {props.maxScore}
            </div>
            <div className="flex w-full mt-16">
                <PrimaryButton text={t('Pokemon_ResetButton_Text')} onClick={() => setIsAbortDialogOpen(true)} className="bg-turquoise min-w-full" />
            </div>
        </div>
    );
};
