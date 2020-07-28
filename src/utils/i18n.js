import Vue from 'vue'
import VueI18n from 'vue-i18n'
import routesI18n from '@/router/i18n'
import './Objects'

/**
 * 创建 i18n 配置
 * @param locale 本地化语言
 * @param fallback 回退语言
 * @returns {VueI18n}
 */
function initI18n(locale, fallback) {
  Vue.use(VueI18n)
  let i18nOptions = {
    locale,
    fallbackLocale: fallback,
    silentFallbackWarn: true,
    messages: routesI18n.messages
  }
  return new VueI18n(i18nOptions)
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

function mergeI18nFromRoutes(i18n, routes) {
  formatOptions(routes, '')
  const CN = generateI18n(new Object(), routes, 'name')
  const US = generateI18n(new Object(), routes, 'path')
  i18n.mergeLocaleMessage('CN', CN)
  i18n.mergeLocaleMessage('US', US)
}

export {
  initI18n,
  mergeI18nFromRoutes
}
