// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['poke-guess-shared']);

module.exports = withTM({
    i18n,
    images: {
        domains: ['raw.githubusercontent.com'],
    },
});
