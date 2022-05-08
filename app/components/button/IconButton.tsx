import React, { FunctionComponent } from 'react';

/**
 * Properties of the icon button.
 */
export interface IIconButtonProps {
    /** The icon component to render. */
    icon: JSX.Element;
    /** On click event of the button. */
    onClick?: () => void;
    /** The aria label to use. */
    ariaLabel?: string;
    /** The optional class name to use. */
    className?: string;
}

/**
 * Basic icon button component.
 *
 * @param {IIconButtonProps} props The properties of the icon button component.
 * @returns {FunctionComponent} The icon button component.
 */
export const IconButton: FunctionComponent<IIconButtonProps> = (props) => {
    return (
        <button aria-label={props.ariaLabel} className={`p-2 rounded-full ${props.className && props.className}`} onClick={props.onClick}>
            {props.icon}
        </button>
    );
};
