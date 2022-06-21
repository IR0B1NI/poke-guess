import { XIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';

import { DefaultButton } from '../button/DefaultButton';
import { IconButton } from '../button/IconButton';
import { PrimaryButton } from '../button/PrimaryButton';

export interface IConfirmDialogProps {
    /** Whether the dialog is open or not. */
    isOpen?: boolean;
    /** The title to display. */
    title?: string;
    /** The text to display. */
    text?: string;
    /** The text of the confirm button. */
    confirmButtonText?: string;
    /** The confirm callback to execute. */
    confirmCallback?: () => void;
    /** The close callback. */
    closeCallback: () => void;
}

/**
 * Confirm dialog component.
 *
 * @param {IConfirmDialogProps} props The properties of the dialog.
 * @returns {FunctionComponent} The custom dialog component.
 */
export const ConfirmDialog: FunctionComponent<IConfirmDialogProps> = (props) => {
    /** Access to translations. */
    const { t } = useTranslation();

    return (
        <div className={`${props.isOpen ? 'fixed' : 'hidden'} top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-40 z-40`}>
            <div className="flex flex-col p-4 bg-white min-w-max rounded-lg shadow z-50 opacity-100 relative w-80">
                <IconButton className="absolute top-2 right-2" icon={<XIcon className="h-4 w-4 text-black" />} onClick={props.closeCallback} />
                <h3>{props.title}</h3>
                <p className="my-5">{props.text}</p>
                <div className="flex justify-end items-center mt-9">
                    <div className="ml-28">
                        <DefaultButton text={t('ConfirmDialog_CloseButton_Text')} onClick={props.closeCallback} />
                    </div>
                    {props.confirmButtonText && props.confirmCallback && (
                        <div>
                            <PrimaryButton
                                className="mr-4"
                                text={props.confirmButtonText}
                                onClick={() => {
                                    if (props.confirmCallback) {
                                        props.confirmCallback();
                                    }
                                    props.closeCallback();
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
