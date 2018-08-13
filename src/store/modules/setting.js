export default {
  namespaced: true,
  state: {
    isMobile: false
  },
  mutations: {
    setDevice (state, isMobile) {
      state.isMobile = isMobile
    }
  }
}
