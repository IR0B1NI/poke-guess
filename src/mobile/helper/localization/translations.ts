import LocalizedStrings from 'react-native-localization';

/** Interface to define the needed translation keys. */
interface ITranslations {
    gameTitle: string;
    welcomeMessage: string;
}

/** The localized texts. */
const translations = new LocalizedStrings<ITranslations>({
    en: {
        gameTitle: 'Poke Guess',
        welcomeMessage: 'Hello World',
    },
    de: {
        gameTitle: 'Poke Guess',
        welcomeMessage: 'Hallo Welt',
    },
});

export default translations;
