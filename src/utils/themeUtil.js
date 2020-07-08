// const varyColor = require('webpack-theme-color-replacer/client/varyColor')
const client = require('webpack-theme-color-replacer/client')
const generate =  require('@ant-design/colors/lib/generate').default
const {theme, themeColor} = require('../config')
const {getDarkColors, isHex, toNum3} = require('../utils/colors')
const themeCfg = require('../config/default').theme

module.exports = {
  primaryColor: themeColor,
  getThemeColors(color, $theme) {
    let _theme = $theme || theme
    let opts = (_theme == 'night') ? {theme: 'dark'} : undefined
    let palettes = generate(color, opts)
    const primary = palettes[5]
    palettes = palettes.concat(generate(primary))
    const darkBgColors = getDarkColors(color, _theme)
    const _themeCfg = themeCfg[_theme]
    const bgColors = Object.keys(_themeCfg)
      .map(key => _themeCfg[key])
      .map(color => isHex(color) ? color : toNum3(color).join(','))
    let rgb = toNum3(primary).join(',')
    return palettes.concat(darkBgColors).concat(bgColors).concat(rgb)
  },
  changeThemeColor (newColor, $theme) {
    let options = {
      newColors: this.getThemeColors(newColor, $theme)
    }
    let promise = client.changer.changeColor(options)
    return promise
  },
  changeSelector (selector) {
    switch (selector) {
      case '.ant-layout-sider':
        return '.ant-layout-sider-dark'
      case '.ant-menu-dark .ant-menu-inline.ant-menu-sub':
        return '.ant-menu-dark .ant-menu-inline:not(.ant-menu-sub)'
      case '.ant-checkbox-checked .ant-checkbox-inner::after':
        return '.ant-checkbox-checked :not(.ant-checkbox-inner)::after'
      case '.side-menu .logo h1':
        return '.side-menu .logo :not(h1)'
      case '.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-submenu-selected,.ant-menu-horizontal>.ant-menu-submenu:hover':
      case '.ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal > .ant-menu-submenu-selected,.ant-menu-horizontal > .ant-menu-submenu:hover':
        return '.ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover'
      case '.ant-menu-horizontal > .ant-menu-item-selected > a':
      case '.ant-menu-horizontal>.ant-menu-item-selected>a':
        return '.ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark) > .ant-menu-item-selected > a'
      case '.ant-menu-horizontal > .ant-menu-item > a:hover':
      case '.ant-menu-horizontal>.ant-menu-item>a:hover':
        return '.ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark) > .ant-menu-item > a:hover'
      default :
        return selector
    }
  },
  modifyVars(color) {
    let opts = (theme == 'night') ? {theme: 'dark'} : undefined
    const darkColors = getDarkColors(color, theme)
    const palettes = generate(color, opts)
    return {
      'primary-color': palettes[5],
      'primary-1': palettes[0],
      'primary-2': palettes[1],
      'primary-3': palettes[2],
      'primary-4': palettes[3],
      'primary-5': palettes[4],
      'primary-6': palettes[5],
      'primary-7': palettes[6],
      'primary-8': palettes[7],
      'primary-9': palettes[8],
      'primary-10': palettes[9],
      'info-color': palettes[5],
      'alert-info-bg-color': palettes[0],
      'alert-info-border-color': palettes[3],
      'processing-color': palettes[5],
      'menu-dark-submenu-bg': darkColors[0],
      'layout-header-background': darkColors[1],
      'layout-trigger-background': darkColors[2],
      ...themeCfg[theme]
    }
  }
}
