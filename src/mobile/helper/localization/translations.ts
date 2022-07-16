import LocalizedStrings from 'react-native-localization';

/** Interface to define the needed translation keys. */
interface ITranslations {
    welcomeMessage: string;
}

/** The localized texts. */
const translations = new LocalizedStrings<ITranslations>({
    en: {
        welcomeMessage: 'Hello World',
    },
    de: {
        welcomeMessage: 'Hallo Welt',
    },
});

export default translations;
