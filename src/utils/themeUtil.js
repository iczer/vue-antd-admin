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
  },
  changeSelector (selector) {
    switch (selector) {
      case '.ant-calendar-today .ant-calendar-date':
        return ':not(.ant-calendar-selected-date):not(.ant-calendar-selected-day)' + selector
      case '.ant-btn:focus,.ant-btn:hover':
        return '.ant-btn:focus:not(.ant-btn-primary):not(.ant-btn-danger),.ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger)'
      case '.ant-btn.active,.ant-btn:active':
        return '.ant-btn.active:not(.ant-btn-primary):not(.ant-btn-danger),.ant-btn:active:not(.ant-btn-primary):not(.ant-btn-danger)'
      case '.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon':
      case '.ant-steps-item-process .ant-steps-item-icon>.ant-steps-icon':
        return ':not(.ant-steps-item-process)' + selector
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
  }
}
