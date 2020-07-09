// admin 配置
const ADMIN = {
  palettes: ['#f5222d', '#fa541c', '#fadb14', '#3eaf7c', '#13c2c2', '#1890ff', '#722ed1', '#eb2f96'],
  animates: require('./animate.config').preset,
  theme: {
    mode: {
      DARK: 'dark',
      LIGHT: 'light',
      NIGHT: 'night'
    }
  },
  layout: {
    SIDE: 'side',
    HEAD: 'head'
  }
}

module.exports = ADMIN
