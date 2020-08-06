const TabsPagePlugin = {
  install(Vue) {
    Vue.mixin({
      methods: {
        $closePage(closeRoute, nextRoute) {
          const event = new CustomEvent('page:close', {detail:{closeRoute, nextRoute}})
          window.dispatchEvent(event)
        }
      }
    })
  }
}

export default TabsPagePlugin
