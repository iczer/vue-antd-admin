const TabsPagePlugin = {
  install(Vue) {
    Vue.mixin({
      methods: {
        $closePage(closeRoute, nextRoute) {
          const event = new CustomEvent('page:close', {detail:{closeRoute, nextRoute}})
          window.dispatchEvent(event)
        },
        $refreshPage(pageKey) {
          const event = new CustomEvent('page:refresh', {detail:{pageKey}})
          window.dispatchEvent(event)
        }
      }
    })
  }
}

export default TabsPagePlugin
