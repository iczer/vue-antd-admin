const varyColor = require('webpack-theme-color-replacer/client/varyColor')
const client = require('webpack-theme-color-replacer/client')
const generate =  require('@ant-design/colors/lib/generate').default
const themeColor = require('../config').themeColor

module.exports = {
  primaryColor: themeColor,
  getThemeColors(color) {
    const lightens = new Array(9).fill().map((t, i) => {
      return varyColor.lighten(color, i / 10)
    })
    const palettes = generate(color)
    const rgb = varyColor.toNum3(color.replace('#', '')).join(',')
    return palettes.concat(lightens).concat(rgb)
  },
  changeThemeColor (newColor) {
    let lastColor = this.lastColor || this.primaryColor
    let options = {
      cssUrl: '/css/theme-colors.css',
      oldColors: this.getThemeColors(lastColor),
      newColors: this.getThemeColors(newColor)
    }
    let promise = client.changer.changeColor(options)
    this.lastColor = lastColor
    return promise
  }
}
