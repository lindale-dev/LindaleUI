import i18n from 'i18next';
import {translate} from 'react-i18next';

const languages = ['en', 'es', 'fr', 'ru'];

// Load resource files
const resources = {};
languages.forEach(locale =>
    resources[locale] = require(`../../locales/${locale}.json`));

i18n.init({
    resources: resources,

    lng: 'en',
    fallbackLng: 'en',
    parseMissingKeyHandler: key => `UNKNOWN KEY "${key}"`,

    debug: process.env.DEBUG,
});

export {
    i18n,
    translate // Export i18next's translate() for convenience
};
