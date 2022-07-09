import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';

import LanguageSelector from '../../languageSelector';

/**
 * Top menu that contains routes and actions.
 *
 * @returns {FunctionComponent} The top menu component.
 */
const TopMenu: FunctionComponent = () => {
    return (
        <div className="fixed top-0 left-0 flex w-full py-4 px-8 items-center xl:bg-transparent z-30">
            <a aria-label="GitHub" href="https://github.com/IR0B1NI/poke-guess" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} size="lg" className="h-5 w-5" />
            </a>
            <div className="flex ml-auto">
                <LanguageSelector />
            </div>
        </div>
    );
};

export default TopMenu;
