export default {
  namespaced: true,
  state: {
    user: undefined,
    permissions: [],
    roles: [],
    routesConfig: []
  },
  getters: {
    user: state => {
      if (!state.user) {
        try {
          const user = localStorage.getItem(process.env.VUE_APP_USER_KEY)
          state.user = JSON.parse(user)
        } catch (e) {
          console.error(e)
        }
      }
      return state.user
    },
    permissions: state => {
      if (!state.permissions || state.permissions.length === 0) {
        try {
          const permissions = localStorage.getItem(process.env.VUE_APP_PERMISSIONS_KEY)
          state.permissions = JSON.parse(permissions)
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.permissions
    },
    roles: state => {
      if (!state.roles || state.roles.length === 0) {
        try {
          const roles = localStorage.getItem(process.env.VUE_APP_ROLES_KEY)
          state.roles = JSON.parse(roles)
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.roles
    },
    routesConfig: state => {
      if (!state.routesConfig || state.routesConfig.length === 0) {
        try {
          const routesConfig = localStorage.getItem(process.env.VUE_APP_ROUTES_KEY)
          state.routesConfig = eval(routesConfig) ? JSON.parse(routesConfig) : state.routesConfig
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.routesConfig
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user))
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
      localStorage.setItem(process.env.VUE_APP_PERMISSIONS_KEY, JSON.stringify(permissions))
    },
    setRoles(state, roles) {
      state.roles = roles
      localStorage.setItem(process.env.VUE_APP_ROLES_KEY, JSON.stringify(roles))
    },
    setRoutesConfig(state, routesConfig) {
      state.routesConfig = routesConfig
      localStorage.setItem(process.env.VUE_APP_ROUTES_KEY, JSON.stringify(routesConfig))
    }
  }
}
