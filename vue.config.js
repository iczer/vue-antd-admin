let path = require('path')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const {getThemeColors, changeSelector, modifyVars} = require('./src/utils/themeUtil')
const themeColor = require('./src/config').themeColor

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")],
    }
  },
  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "whatwg-fetch", "./src/main.js"];
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(themeColor),
        changeSelector
      })
    )
  },
  chainWebpack: config => {
    config
      .plugin('optimize-css')
      .tap(args => {
        args[0].cssnanoOptions.preset[1].colormin = false
        return args
      })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(themeColor),
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false
}
