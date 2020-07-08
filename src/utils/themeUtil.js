const client = require('webpack-theme-color-replacer/client')
const {theme, themeColor} = require('../config')
const {getMenuColors, getAntdColors, getThemeToggleColors} = require('../utils/colors')
const {theme: themeCfg} = require('../config/default')

module.exports = {
  getThemeColors(color, $theme) {
    const _color = color || themeColor
    const _theme = $theme || theme
    const replaceColors = getThemeToggleColors(_color, _theme)
    const themeColors = [
      ...replaceColors.mainColors,
      ...replaceColors.subColors,
      ...replaceColors.menuColors,
      ...replaceColors.contentColors,
      ...replaceColors.rgbColors
    ]
    return themeColors
  },
  changeThemeColor (newColor, $theme) {
    let promise = client.changer.changeColor({newColors: this.getThemeColors(newColor, $theme)})
    return promise
  },
  modifyVars(color) {
    let _color = color || themeColor
    const palettes = getAntdColors(_color, theme)
    const menuColors = getMenuColors(_color, theme)
    const primary = palettes[5]
    return {
      'primary-color': primary,
      'info-color': primary,
      'alert-info-bg-color': palettes[0],
      'alert-info-border-color': palettes[3],
      'processing-color': primary,
      'menu-dark-submenu-bg': menuColors[0],
      'layout-header-background': menuColors[1],
      'layout-trigger-background': menuColors[2],
      ...themeCfg[theme]
    }
  }
}
