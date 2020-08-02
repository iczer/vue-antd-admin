import VueI18nPlugin from '@/plugins/i18n-extend'
import AuthorityPlugin from '@/plugins/authority-plugin'

const Plugins = {
  install: function (Vue) {
    Vue.use(VueI18nPlugin)
    Vue.use(AuthorityPlugin)
  }
}
export default Plugins
