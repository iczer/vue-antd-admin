import Vue from 'vue'
import VueI18n from 'vue-i18n'
import routesI18n from '@/router/i18n'
import './Objects'

/**
 * 创建 i18n 配置
 * @param router 路由
 * @param locale 本地化语言
 * @param fallback 回退语言
 * @returns {VueI18n}
 */
function initI18n(router, locale, fallback) {
  Vue.use(VueI18n)
  const options = router.options.routes.find(item => item.path === '/').children
  formatOptions(options, '')
  const CN = generateI18n(new Object(), options, 'name')
  const US = generateI18n(new Object(), options, 'path')
  const i18n = new VueI18n({
    locale,
    fallbackLocale: fallback,
    silentFallbackWarn: true,
    messages: {CN, US}
  })
  const messages = routesI18n.messages
  Object.keys(messages).forEach(key => {
    i18n.mergeLocaleMessage(key, messages[key])
  })
  return i18n
}

/**
 * 根据 router options 配置生成 国际化语言
 * @param lang
 * @param options
 * @param valueKey
 * @returns {*}
 */
function generateI18n(lang, options, valueKey) {
  options.forEach(menu => {
    let keys = menu.fullPath.substring(1).split('/').concat('name')
    lang.assignProps(keys, menu[valueKey])
    if (menu.children) {
      generateI18n(lang, menu.children, valueKey)
    }
  })
  return lang
}

/**
 * 格式化 router options，生成 fullPath
 * @param options
 * @param parentPath
 */
function formatOptions(options, parentPath) {
  options.forEach(route => {
    let isFullPath = route.path.substring(0, 1) === '/'
    route.fullPath = isFullPath ? route.path : parentPath + '/' + route.path
    if (route.children) {
      formatOptions(route.children, route.fullPath)
    }
  })
}

export {
  initI18n
}