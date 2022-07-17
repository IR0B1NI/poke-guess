import LocalizedStrings from 'react-native-localization';

/** Interface to define the needed translation keys. */
interface ITranslations {
    stackHeaderBackTitle: string;
    gameTitle: string;
    settingsTitle: string;
    gameSettingsTitle: string;
    welcomeMessage: string;
}

/** The localized texts. */
const translations = new LocalizedStrings<ITranslations>({
    en: {
        stackHeaderBackTitle: 'Back',
        gameTitle: 'Poke Guess',
        settingsTitle: 'Settings',
        gameSettingsTitle: 'Game settings',
        welcomeMessage: 'Hello World',
    },
    de: {
        stackHeaderBackTitle: 'Zurück',
        gameTitle: 'Poke Guess',
        settingsTitle: 'Einstellungen',
        gameSettingsTitle: 'Spieleinstellungen',
        welcomeMessage: 'Hallo Welt',
    },
});

export default translations;
