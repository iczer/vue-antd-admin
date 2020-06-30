const {generate} = require('@ant-design/colors')
// ant design vue 默认主题色
const antPrimaryColor = '#1890ff'
// ant design vue 默认dark主题色，若主题色为默认主题色则返回此 dark 主题色系
const antDarkColors = ['#000c17', '#001529', '#002140']

function getDarkColors(color, theme) {
  if (color == antPrimaryColor) {
    return antDarkColors
  }
  const lightColors = generate(color, {theme: theme, backgroundColor: '#000000'})
  const darkColors = generate(lightColors[5], {theme: theme, backgroundColor: '#000000'})
  let deepDark = darkColors.slice(0, 3)
  return deepDark
}

module.exports = {getDarkColors}
