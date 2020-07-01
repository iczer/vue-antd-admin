const varyColor = require('webpack-theme-color-replacer/client/varyColor')
// ant design vue 默认主题色
const antPrimaryColor = '#1890ff'
// ant design vue 默认dark主题色，若主题色为默认主题色则返回此 dark 主题色系
const antDarkColors = ['#000c17', '#001529', '#002140']

function getDarkColors(color) {
  if (color == antPrimaryColor) {
    return antDarkColors
  }
  const darkColors = []
  darkColors.push(varyColor.darken(color, 0.93), varyColor.darken(color, 0.83), varyColor.darken(color, 0.73))
  return darkColors
}

module.exports = {getDarkColors}
