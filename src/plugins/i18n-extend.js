const VueI18nPlugin = {
  install: function (Vue) {
    Vue.mixin({
      methods: {
        $ta(syntaxKey) {
          let keys = syntaxKey.split('|')
          let message = ''
          let _this = this
          keys.forEach(key => {
            message += _this.$t(key)
          })
          if (keys.length > 0) {
            message = message.charAt(0).toUpperCase() + message.toLowerCase().substring(1)
          }
          return message
        }
      }
    })
  }
}
export default VueI18nPlugin
