export default {
  namespaced: true,
  state: {
    isMobile: false,
    theme: 'dark'
  },
  mutations: {
    setDevice (state, isMobile) {
      state.isMobile = isMobile
    },
    setTheme (state, theme) {
      state.theme = theme
    }
  }
}
