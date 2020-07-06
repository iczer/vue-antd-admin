const varyColor = require('webpack-theme-color-replacer/client/varyColor')
// ant design vue 默认主题色
const antPrimaryColor = '#1890ff'
// ant design vue 默认dark主题色，若主题色为默认主题色则返回此 dark 主题色系
const antDarkColors = ['#000c17', '#001529', '#002140']
const nightColors = ['#151515', '#1f1f1f', '#1f1f1f']


function getDarkColors(color, theme) {
  if (theme == 'night') {
    return nightColors
  }
  if (color == antPrimaryColor) {
    return antDarkColors
  }
  const darkColors = []
  darkColors.push(varyColor.darken(color, 0.93), varyColor.darken(color, 0.83), varyColor.darken(color, 0.73))
  return darkColors
}

function getBgColors(theme) {
  return theme == 'light' ? ['#f0f2f5', '#ffffff'] : ['#000000', '#141414']
}

function toNum3(color) {
  if (isHex(color)) {
    return varyColor.toNum3(color)
  }
  let colorStr = ''
  if (isRgb(color)) {
    colorStr = color.slice(5, color.length)
  } else if (isRgba(color)) {
    colorStr = color.slice(6, color.lastIndexOf(','))
  }
  let rgb = colorStr.split(',')
  const r = parseInt(rgb[0])
  const g = parseInt(rgb[1])
  const b = parseInt(rgb[2])
  return [r, g, b]
}

function isHex(color) {
  return color.length >= 4 && color[0] == '#'
}

function isRgb(color) {
  return color.length >= 10 && color.slice(0, 3) == 'rgb'
}

function isRgba(color) {
  return color.length >= 13 && color.slice(0, 4) == 'rgba'
}

module.exports = {getDarkColors, getBgColors, isHex, isRgb, isRgba, toNum3}
