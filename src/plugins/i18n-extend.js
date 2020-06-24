// 语句模式
const MODE = {
  STATEMENTS: 's', //语句模式
  PHRASAL: 'p', //词组模式
}

const VueI18nPlugin = {
  install: function (Vue) {
    Vue.mixin({
      methods: {
        $ta(syntaxKey, mode) {
          let _mode = mode || MODE.STATEMENTS
          let keys = syntaxKey.split('|')
          let _this = this
          let locale = this.$i18n.locale
          let message = ''
          let splitter = locale == 'US' ? ' ' : ''
          // 拼接 message
          keys.forEach(key => {
            message += _this.$t(key) + splitter
          })
          // 英文环境语句模式下，转换单词大小写
          if (keys.length > 0 && _mode == MODE.STATEMENTS && locale == 'US') {
            message = message.charAt(0).toUpperCase() + message.toLowerCase().substring(1)
          }
          return message
        }
      }
    })
  }
}
export default VueI18nPlugin
