module.exports = {
  pages: {
    index: {
      entry: './src/main.js',
      template: './src/index.pug',
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
