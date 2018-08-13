export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setuser (state, user) {
      state.user = user
    }
  }
}
