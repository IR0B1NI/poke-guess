import React, { ChangeEvent, FunctionComponent } from 'react';

export interface ICheckBoxProps {
    /** The text to display. */
    text?: string;
    /** The value attribute. */
    value?: string;
    /** Whether the checkbox is checked or not. */
    checked?: boolean;
    /** The callback to execute on the change event. */
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    /** Whether the checkbox is currently disabled or not. */
    disabled?: boolean;
    /** The aria label to set for accessibility. */
    ariaLabel: string;
}

/**
 * Component for a basic checkbox.
 *
 * @param {ICheckBoxProps} props The properties of the checkbox.
 * @returns {FunctionComponent} The basic checkbox.
 */
const CheckBox: FunctionComponent<ICheckBoxProps> = (props) => {
    return (
        <div className="flex max-w-max items-center">
            <input
                aria-label={props.ariaLabel}
                type="checkbox"
                disabled={props.disabled}
                className="flex justify-center items-center w-6 h-6 rounded-full checkbox"
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
            />
            <div className="ml-2">{props.text}</div>
        </div>
    );
};

export default CheckBox;
