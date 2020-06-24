import VueI18nPlugin from '@/plugins/i18n-extend';
const Plugins = {
  install: function (Vue) {
    Vue.use(VueI18nPlugin)
  }
}
export default Plugins
