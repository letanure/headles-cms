const webpack = require('webpack')

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

  configureWebpack: {
    plugins: [
      // eslint-disable-next-line no-undef
      new webpack.NormalModuleReplacementPlugin(
        /element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/,
        'element-ui/lib/locale/lang/en',
      ),
    ],
  },
}
