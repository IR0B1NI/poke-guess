import React, { FunctionComponent } from 'react';
import * as PrimitiveCheckBox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@heroicons/react/solid';

export interface ICheckBoxProps {
    /** The text to display. */
    text?: string;
    /** The value attribute. */
    value?: string;
    /** Whether the checkbox is checked or not. */
    checked?: boolean;
    /** The callback to execute on the change event. */
    onChange: (checked: boolean) => void;
    /** Whether the checkbox is currently disabled or not. */
    disabled?: boolean;
}

/**
 * Component for a basic checkbox.
 *
 * @param {ICheckBoxProps} props The properties of the checkbox.
 * @returns {FunctionComponent} The basic checkbox.
 */
export const CheckBox: FunctionComponent<ICheckBoxProps> = (props) => {
    return (
        <div className="flex max-w-max items-center">
            <PrimitiveCheckBox.Root
                disabled={props.disabled}
                className="flex justify-center items-center w-6 h-6 rounded-full border border-black"
                value={props.value}
                onCheckedChange={props.onChange}
                checked={props.checked}
            >
                <PrimitiveCheckBox.Indicator>
                    <CheckIcon className="h-5 w-5 text-black" />
                </PrimitiveCheckBox.Indicator>
            </PrimitiveCheckBox.Root>
            <div className="ml-2">{props.text}</div>
        </div>
    );
};
