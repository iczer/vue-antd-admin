import {footerLinks, animates} from '@/config'
export default {
  namespaced: true,
  state: {
    isMobile: false,
    theme: 'dark',
    layout: 'side',
    systemName: 'Vue Antd Admin',
    copyright: '2018 ICZER 工作室出品',
    footerLinks: footerLinks,
    multiPage: true,
    animates: animates,
    animate: {
      name: 'back',
      direction: 'left'
    }
  },
  mutations: {
    setDevice (state, isMobile) {
      state.isMobile = isMobile
    },
    setTheme (state, theme) {
      state.theme = theme
    },
    setLayout (state, layout) {
      state.layout = layout
    },
    setMultiPage (state, multiPage) {
      state.multiPage = multiPage
    },
    setAnimate (state, animate) {
      state.animate = animate
    }
  }
}
