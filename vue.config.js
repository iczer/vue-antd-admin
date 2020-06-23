let path = require('path')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const {getThemeColors, changeSelector} = require('./src/utils/themeUtil')
const themeColor = require('./src/config').themeColor

module.exports = {
  // transpileDependencies: ['webpack-theme-color-replacer'],
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
        fileName: 'css/theme-colors.css',
        matchColors: getThemeColors(themeColor),
        changeSelector
      })
    )
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 'link-color': '#ff4d85',
            // 'processing-color': '#ff4d85',
            // 'primary-color': '#ff4d85',
            // 'primary': '#1890ff',
          },
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
