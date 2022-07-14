import { CheckCircleIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, KeyboardEvent, useEffect, useState } from 'react';

import TextField from '../textField';

export interface ITextInputGroupProps {
    /** The initial text value. */
    initialValue?: string;
    /** The placeholder to use if there is no value. */
    placeholder?: string;
    /** The callback to execute on submit. */
    submit: (value: string) => void;
}

/**
 * Input group for text containing an input field and a submit button.
 *
 * @param {ITextInputGroupProps} props The component properties.
 * @returns {FunctionComponent} The text input group component.
 */
const TextInputGroup: FunctionComponent<ITextInputGroupProps> = (props) => {
    /** Access to translations. */
    const { t } = useTranslation();

    /** The current text value in the text field. */
    const [value, setValue] = useState<string>('');

    /** Init value state from props. */
    useEffect(() => {
        setValue(props.initialValue ?? '');
    }, [props.initialValue]);

    /**
     * Handle value changes in the text field.
     *
     * @param {string} newValue The new text value.
     */
    const onValueChange = (newValue: string) => {
        setValue(newValue);
    };

    /**
     * Submit user input and then reset it.
     */
    const submitValue = () => {
        // Execute the submit callback to handle the current user input.
        props.submit(value);
        // Reset the state of the users input.
        setValue('');
    };

    /**
     * Handle what happens when the user presses 'enter' inside the text input.
     *
     * @param {KeyboardEvent<HTMLInputElement>} event The keyboard event.
     */
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        // Check if the user pressed enter to confirm the current input.
        if (event.key !== 'Enter') {
            return;
        }
        submitValue();
    };

    return (
        <div className="input-group">
            <TextField placeholder={props.placeholder} value={value} onChange={onValueChange} onKeyDown={onKeyDown} />
            <button aria-label={t('TextInputGroup_Button_Aria_Label')} className="btn btn-square" onClick={submitValue}>
                <CheckCircleIcon className="h-6 w-6" />
            </button>
        </div>
    );
};

export default TextInputGroup;
