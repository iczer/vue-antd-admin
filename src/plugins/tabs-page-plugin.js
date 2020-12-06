const TabsPagePlugin = {
  install(Vue) {
    Vue.mixin({
      methods: {
        $closePage(closeRoute, nextRoute) {
          const event = new CustomEvent('page:close', {detail:{closeRoute, nextRoute}})
          window.dispatchEvent(event)
        },
        $refreshPage(route) {
          const path = typeof route === 'object' ? route.path : route
          const event = new CustomEvent('page:refresh', {detail:{pageKey: path}})
          window.dispatchEvent(event)
        },
        $openPage(route, title) {
          this.$setPageTitle(route, title)
          this.$router.push(route)
        },
        $setPageTitle(route, title) {
          if (title) {
            let path = typeof route === 'object' ? route.path : route
            path = path && path.split('?')[0]
            this.$store.commit('setting/setCustomTitle', {path, title})
          }
        }
      },
      computed: {
        customTitle() {
          const customTitles = this.$store.state.setting.customTitles
          const path = this.$route.path.split('?')[0]
          const custom = customTitles.find(item => item.path === path)
          return custom && custom.title
        }
      }
    })
  }
}

export default TabsPagePlugin
