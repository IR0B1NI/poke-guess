import React, { FunctionComponent, useState } from 'react';
import { TranslateIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import { useStoreActions, useStoreState } from '../store/Store';
import * as PopoverPrimitive from '@radix-ui/react-popover';

/**
 * Component to select and switch the application display language.
 *
 * @returns {FunctionComponent} The language selector component.
 */
export const LanguageSelector: FunctionComponent = () => {
    /** Access to translations. */
    const { t, i18n } = useTranslation();

    /** Whether the popover is open or not. */
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    /** Global state of the user settings. */
    const userSettings = useStoreState((state) => state.UserModel.userSettings);
    /** Action to update the global user settings. */
    const updateUserSettings = useStoreActions((actions) => actions.UserModel.updateUserSettings);

    /**
     * The icon to use for the language selection opening button.
     */
    const icon = <TranslateIcon className="h-5 w-5 text-black" />;

    /**
     * Switch the language.
     *
     * @param {string} languageShortKey The short key of the desired language.
     */
    const switchLanguage = (languageShortKey: string) => {
        if (!userSettings) {
            return;
        }
        // Switch the language.
        i18n.changeLanguage(languageShortKey);
        // Update the global user settings.
        userSettings.language = languageShortKey;
        updateUserSettings({ ...userSettings });
        // Update the html lang tag.
        document.documentElement.lang = userSettings.language;
    };

    return (
        <PopoverPrimitive.Root open={isPopoverOpen} onOpenChange={(open: boolean) => setIsPopoverOpen(open)}>
            <PopoverPrimitive.Trigger asChild>
                <button aria-label={t('Language_Button_Aria_Label')} className="p-2 rounded-full" onClick={() => setIsPopoverOpen(true)}>
                    {icon}
                </button>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content align='start'>
                <div className="flex flex-1 z-30 shadow rounded-lg bg-white">
                    <ul className="list-none">
                        <li>
                            <PopoverPrimitive.Close asChild>
                                <button
                                    aria-label={t('Language_Button_En_Aria_Label')}
                                    disabled={i18n.language === 'en'}
                                    className="py-2 px-6 min-w-full"
                                    onClick={() => switchLanguage('en')}
                                >
                                    {t('Language_Option_En')}
                                </button>
                            </PopoverPrimitive.Close>
                        </li>
                        <li>
                            <PopoverPrimitive.Close asChild>
                                <button
                                    aria-label={t('Language_Button_De_Aria_Label')}
                                    disabled={i18n.language === 'de'}
                                    className="py-2 px-6 min-w-full"
                                    onClick={() => switchLanguage('de')}
                                >
                                    {t('Language_Option_De')}
                                </button>
                            </PopoverPrimitive.Close>
                        </li>
                    </ul>
                </div>
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
    );
};
