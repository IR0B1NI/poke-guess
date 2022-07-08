import React, { FunctionComponent } from 'react';

export interface IDefaultButtonProps {
    /** The text to display. */
    text?: string;
    /** The on click callback. */
    onClick?: () => void;
    /** The optional class names to apply. */
    className?: string;
}

/**
 * The basic default button component.
 *
 * @param {IDefaultButtonProps} props The properties of the default button.
 * @returns {FunctionComponent} The default button component.
 */
const DefaultButton: FunctionComponent<IDefaultButtonProps> = (props) => {
    return (
        <button className={`text-xs max-w-max px-5 py-3 bg-transparent ${props.className && props.className}`} onClick={props.onClick}>
            {props.text}
        </button>
    );
};

export default DefaultButton;