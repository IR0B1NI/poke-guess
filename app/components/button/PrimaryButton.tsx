import React, { FunctionComponent } from 'react';

export interface IPrimaryButtonProps {
    /** The text to display. */
    text?: string;
    /** The on click callback. */
    onClick?: () => void;
    /** The optional class names to apply. */
    className?: string;
}

/**
 * The basic primary button component.
 *
 * @param {IPrimaryButtonProps} props The properties of the primary button.
 * @returns {FunctionComponent} The primary button component.
 */
export const PrimaryButton: FunctionComponent<IPrimaryButtonProps> = (props) => {
    return (
        <button className={`text-xs max-w-max px-5 py-3 bg-green-300 shadow-md active:opacity-50 ${props.className && props.className}`} onClick={props.onClick}>
            {props.text}
        </button>
    );
};
