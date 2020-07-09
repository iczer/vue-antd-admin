import config from '@/config'
import {ADMIN} from '@/config/default'
export default {
  namespaced: true,
  state: {
    isMobile: false,
    animates: ADMIN.animates,
    palettes: ADMIN.palettes,
    routesI18n: {},
    ...config,
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
    },
    setWeekMode(state, weekMode) {
      state.weekMode = weekMode
    },
    setFixedHeader(state, fixedHeader) {
      state.fixedHeader = fixedHeader
    },
    setFixedSideBar(state, fixedSideBar) {
      state.fixedSideBar = fixedSideBar
    },
    setLang(state, lang) {
      state.lang = lang
    },
    setRoutesI18n(state, i18n) {
      state.routesI18n = i18n
    },
    setHideSetting(state, hideSetting) {
      state.hideSetting = hideSetting
    }
  }
}
