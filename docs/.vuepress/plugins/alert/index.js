const path = require('path')

module.exports = (options, ctx) => {
  return {
    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
    extendPageData($page) {
      $page.alert = {
        top: 100
      }
    },
    enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js')
  }
}