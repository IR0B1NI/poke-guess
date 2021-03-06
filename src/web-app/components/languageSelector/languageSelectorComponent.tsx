import { TranslateIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';

/**
 * The icon to use for the language selection opening button.
 */
const icon = <TranslateIcon className="h-3 w-3 sm:h-5 sm:w-5" />;

/**
 * Component to select and switch the application display language.
 *
 * @returns {FunctionComponent} The language selector component.
 */
const LanguageSelector: FunctionComponent = () => {
    /** Access to translations. */
    const { t, i18n } = useTranslation();
    /** Access to the next js router. */
    const router = useRouter();

    return (
        <div className="dropdown dropdown-end">
            <label aria-label={t('Language_Button_Aria_Label')} tabIndex={0} className="btn btn-circle btn-ghost mb-1 sm:h-12 sm:w-12 min-h-8 h-8 w-8">
                {icon}
            </label>
            <ul tabIndex={0} className="dropdown-content bg-white dark:bg-base-100 menu shadow rounded-box w-40">
                <li className={`${i18n.language === 'en' && 'disabled'}`}>
                    {i18n.language !== 'en' ? (
                        <Link href={router.asPath} locale={'en'}>
                            <a aria-label={t('Language_Button_En_Aria_Label')} className="p-3 flex justify-center">
                                {t('Language_Option_En')}
                            </a>
                        </Link>
                    ) : (
                        <div className="p-3 flex justify-center">{t('Language_Option_En')}</div>
                    )}
                </li>
                <li className={`${i18n.language === 'de' && 'disabled'}`}>
                    {i18n.language !== 'de' ? (
                        <Link href={router.asPath} locale={'de'}>
                            <a aria-label={t('Language_Button_De_Aria_Label')} className="p-3 flex justify-center">
                                {t('Language_Option_De')}
                            </a>
                        </Link>
                    ) : (
                        <div className="p-3 flex justify-center">{t('Language_Option_De')}</div>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default LanguageSelector;
