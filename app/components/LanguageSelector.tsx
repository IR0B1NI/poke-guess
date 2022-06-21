import { TranslateIcon } from '@heroicons/react/solid';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, useState } from 'react';

/**
 * The icon to use for the language selection opening button.
 */
const icon = <TranslateIcon className="h-5 w-5 text-black" />;

/**
 * Properties of the custom button.
 */
interface ILanguageButtonProps {
    /** Whether this is the active language or not. */
    isActiveLanguage: boolean;
    /** The aria label to use. */
    ariaLabel: string;
    /** The text to render. */
    text: string;
}

/**
 * Custom button component for the language list.
 *
 * @param {ILanguageButtonProps} props The properties of the custom button.
 * @returns {FunctionComponent} The styled button component to choose a language.
 */
const LanguageButton: FunctionComponent<ILanguageButtonProps> = (props) => (
    <button aria-label={props.ariaLabel} disabled={props.isActiveLanguage} className="py-2 px-6 min-w-full">
        {props.text}
    </button>
);

/**
 * Component to select and switch the application display language.
 *
 * @returns {FunctionComponent} The language selector component.
 */
export const LanguageSelector: FunctionComponent = () => {
    /** Access to translations. */
    const { t, i18n } = useTranslation();
    /** Access to the next js router. */
    const router = useRouter();

    /** Whether the popover is open or not. */
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    return (
        <PopoverPrimitive.Root open={isPopoverOpen} onOpenChange={(open: boolean) => setIsPopoverOpen(open)}>
            <PopoverPrimitive.Trigger asChild>
                <button aria-label={t('Language_Button_Aria_Label')} className="p-2 rounded-full" onClick={() => setIsPopoverOpen(true)}>
                    {icon}
                </button>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content align="start">
                <div className="flex flex-1 z-30 shadow rounded-lg bg-white">
                    <ul className="list-none">
                        <li>
                            <Link href={router.asPath} locale={'en'}>
                                <a>
                                    <LanguageButton ariaLabel={t('Language_Button_En_Aria_Label')} isActiveLanguage={i18n.language === 'en'} text={t('Language_Option_En')} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={router.asPath} locale={'de'}>
                                <a>
                                    <LanguageButton ariaLabel={t('Language_Button_De_Aria_Label')} isActiveLanguage={i18n.language === 'de'} text={t('Language_Option_De')} />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
    );
};
