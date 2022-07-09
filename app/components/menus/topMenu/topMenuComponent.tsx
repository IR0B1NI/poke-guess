import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';

import DarkModeToggle from '../../darkModeToggle';
import LanguageSelector from '../../languageSelector';

/**
 * Top menu that contains routes and actions.
 *
 * @returns {FunctionComponent} The top menu component.
 */
const TopMenu: FunctionComponent = () => {
    /** Access to translations. */
    const { t } = useTranslation();

    return (
        <div className="fixed top-0 left-0 flex w-full py-4 px-8 items-center bg-base-100 xl:bg-transparent z-30">
            <div className="flex w-24 justify-start">
                <a aria-label="GitHub" href="https://github.com/IR0B1NI/poke-guess" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="lg" className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
            </div>
            <div className="flex ml-auto mr-auto">
                <h1 className='text-base sm:text-xl md:text-4xl'>{t('Index_Headline')}</h1>
            </div>
            <div className="flex w-24 justify-end">
                <DarkModeToggle />
                <LanguageSelector />
            </div>
        </div>
    );
};

export default TopMenu;
