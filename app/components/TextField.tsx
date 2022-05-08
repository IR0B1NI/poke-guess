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
}

/**
 * The basic text field component.
 *
 * @param {ITextFieldProps} props The properties of the text field.
 * @returns {FunctionComponent} The text field component.
 */
export const TextField: FunctionComponent<ITextFieldProps> = (props) => {
    return (
        <input
            className="text-black px-5 py-3 border-b border-b-black outline-none bg-transparent"
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
