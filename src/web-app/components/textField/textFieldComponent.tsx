import React, { FunctionComponent, KeyboardEvent } from 'react';

export interface ITextFieldProps {
    /** The current value. */
    value: string;
    /** The on change callback. */
    onChange: (newValue: string) => void;
    /** Whether the textfield is read only or not. */
    readOnly?: boolean;
    /** The placeholder to use. */
    placeholder?: string;
    /** The optional on key down callback. */
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    /** Whether to disable textfield typing helper or not. */
    disableAutoHelper?: boolean;
}

/**
 * The basic text field component.
 *
 * @param {ITextFieldProps} props The properties of the text field.
 * @returns {FunctionComponent} The text field component.
 */
const TextField: FunctionComponent<ITextFieldProps> = (props) => {
    return (
        <input
            autoCorrect={props.disableAutoHelper ? 'off' : 'on'}
            autoComplete={props.disableAutoHelper ? 'off' : 'on'}
            spellCheck={!props.disableAutoHelper}
            className="input w-full"
            readOnly={props.readOnly}
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            onKeyDown={(event) => {
                if (props.onKeyDown) {
                    props.onKeyDown(event);
                }
            }}
        />
    );
};

export default TextField;
