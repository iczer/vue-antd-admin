import Vue from 'vue'
import VueI18n from 'vue-i18n'
import routesI18n from '@/router/i18n'
import './Objects'
import {getI18nKey} from '@/utils/routerUtil'

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
  }
  return new VueI18n(i18nOptions)
}

/**
 * 根据 router options 配置生成 国际化语言
 * @param lang
 * @param routes
 * @param valueKey
 * @returns {*}
 */
function generateI18n(lang, routes, valueKey) {
  routes.forEach(route => {
    let keys = getI18nKey(route.fullPath).split('.')
    let value = valueKey === 'path' ? route[valueKey].split('/').filter(item => !item.startsWith(':') && item != '').join('.') : route[valueKey]
    lang.assignProps(keys, value)
    if (route.children) {
      generateI18n(lang, route.children, valueKey)
    }
  })
  return lang
}

/**
 * 格式化 router.options.routes，生成 fullPath
 * @param routes
 * @param parentPath
 */
function formatFullPath(routes, parentPath = '') {
  routes.forEach(route => {
    let isFullPath = route.path.substring(0, 1) === '/'
    route.fullPath = isFullPath ? route.path : (parentPath === '/' ? parentPath + route.path : parentPath + '/' + route.path)
    if (route.children) {
      formatFullPath(route.children, route.fullPath)
    }
  })
}

/**
 * 从路由提取国际化数据
 * @param i18n
 * @param routes
 */
function mergeI18nFromRoutes(i18n, routes) {
  formatFullPath(routes)
  const CN = generateI18n(new Object(), routes, 'name')
  const US = generateI18n(new Object(), routes, 'path')
  i18n.mergeLocaleMessage('CN', CN)
  i18n.mergeLocaleMessage('US', US)
  const messages = routesI18n.messages
  Object.keys(messages).forEach(lang => {
    i18n.mergeLocaleMessage(lang, messages[lang])
  })
}

export {
  initI18n,
  mergeI18nFromRoutes,
  formatFullPath
}
