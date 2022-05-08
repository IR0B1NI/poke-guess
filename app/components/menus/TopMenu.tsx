import React, { FunctionComponent } from 'react';
import { LanguageSelector } from '../LanguageSelector';

/**
 * Top menu that contains routes and actions.
 *
 * @returns {FunctionComponent} The top menu component.
 */
export const TopMenu: FunctionComponent = () => {
    return (
        <div className="fixed top-0 left-0 flex w-full py-4 px-8 items-center bg-gray-50 xl:bg-transparent z-30">           
            <div className="flex ml-auto">
                <LanguageSelector />
            </div>
        </div>
    );
};
