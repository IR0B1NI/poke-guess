import LocalizedStrings from 'react-native-localization';

/** Interface to define the needed translation keys. */
interface ITranslations {}

/** The localized texts. */
const translations = new LocalizedStrings<ITranslations>({
    en: {},
    de: {},
});

export default translations;
