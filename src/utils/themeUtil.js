const ThemeColorReplacer = require('webpack-theme-color-replacer')
const client = require('webpack-theme-color-replacer/client')
const generate =  require('@ant-design/colors/lib/generate').default

module.exports = {
  primaryColor: '#1890ff',
  getThemeColors(color) {
    const lightens = new Array(9).fill().map((t, i) => {
      return ThemeColorReplacer.varyColor.lighten(color, i / 10)
    })
    const palettes = generate(color)
    const rgb = ThemeColorReplacer.varyColor.toNum3(color.replace('#', '')).join(',')
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
