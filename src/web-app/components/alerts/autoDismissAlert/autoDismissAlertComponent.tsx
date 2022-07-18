import { AlertType } from 'poke-guess-common';
import React, { FunctionComponent, useEffect, useMemo } from 'react';

export interface IAutoDismissAlertProps {
    /** Whether to show the alert or not. */
    show: boolean;
    /** Callback to automatically hide the alert after some time. */
    hide: () => void;
    /** The text to display in the alert. */
    text: string;
    /** The type of the alert. */
    type: AlertType;
}

/**
 * An automatically dismissing alert.
 *
 * @param {IAutoDismissAlertProps} props The component properties.
 * @returns {FunctionComponent} The alert component.
 */
const AutoDismissAlert: FunctionComponent<IAutoDismissAlertProps> = (props) => {
    /** The default time to pass in milliseconds before the alert is automatically dismissed. */
    const defaultDismissTime = 3000;

    /** Automatically hide the dialog after some time. */
    useEffect(() => {
        if (props.show) {
            // If the alert must be shown, hide it automatically after some time.
            setTimeout(() => props.hide(), defaultDismissTime);
        }
    }, [props]);

    /** The alert type class based on given type in props.  */
    const alertTypeClass = useMemo(() => {
        let className = '';
        switch (props.type) {
            case AlertType.None:
                className = '';
                break;
            case AlertType.Info:
                className = 'alert-info';
                break;
            case AlertType.Success:
                className = 'alert-success';
                break;
            case AlertType.Warning:
                className = 'alert-warning';
                break;
            case AlertType.Error:
                className = 'alert-error';
                break;
            default:
                className = '';
                break;
        }
        return className;
    }, [props.type]);
    return props.show ? <div className={`alert ${alertTypeClass} shadow-lg fixed top-4 w-9/12 z-50 translate-x-1/2 right-1/2`}>{props.text}</div> : <></>;
};

export default AutoDismissAlert;
