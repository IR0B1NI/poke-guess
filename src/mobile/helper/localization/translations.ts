import LocalizedStrings from 'react-native-localization';

/** Interface to define the needed translation keys. */
interface ITranslations {
    gameTitle: string;
    settingsTitle: string;
    welcomeMessage: string;
}

/** The localized texts. */
const translations = new LocalizedStrings<ITranslations>({
    en: {
        gameTitle: 'Poke Guess',
        settingsTitle: 'Settings',
        welcomeMessage: 'Hello World',
    },
    de: {
        gameTitle: 'Poke Guess',
        settingsTitle: 'Einstellungen',
        welcomeMessage: 'Hallo Welt',
    },
});

export default translations;
