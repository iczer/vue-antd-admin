const TabsPagePlugin = {
  install(Vue) {
    Vue.mixin({
      methods: {
        $closePage(closeRoute, nextRoute) {
          const event = new CustomEvent('page:close', {detail:{closeRoute, nextRoute}})
          window.dispatchEvent(event)
        },
        $refreshPage(route) {
          const fullPath = typeof route === 'object' ? route.fullPath : route
          const event = new CustomEvent('page:refresh', {detail:{fullPath}})
          window.dispatchEvent(event)
        },
        $openPage(route, title) {
          this.$setPageTitle(route, title)
          this.$router.push(route)
        },
        $setPageTitle(route, title) {
          if (title) {
            const fullPath = typeof route === 'object' ? route.fullPath : route
            this.$store.commit('setting/setCustomTitle', {path: fullPath, title})
          }
        }
      },
      computed: {
        customTitle() {
          const customTitles = this.$store.state.setting.customTitles
          const fullPath = this.$route.fullPath
          const custom = customTitles.find(item => item.path === fullPath)
          return custom && custom.title
        }
      }
    })
  }
}

export default TabsPagePlugin
