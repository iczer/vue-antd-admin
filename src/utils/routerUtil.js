import routerMap from '@/router/async/router.map'
import {mergeI18nFromRoutes} from '@/utils/i18n'
import Router from 'vue-router'

/**
 * 根据 路由配置 和 路由组件注册 解析路由
 * @param routesConfig 路由配置
 * @param routerMap 本地路由组件注册配置
 */
function parseRoutes(routesConfig, routerMap) {
  let routes = []
  routesConfig.forEach(item => {
    // 获取注册在 routerMap 中的 router，初始化 routeCfg
    let router = undefined, routeCfg = {}
    if (typeof item === 'string' && routerMap[item]) {
      router = routerMap[item]
      routeCfg = {path: router.path || item, router: item}
    } else if (typeof item === 'object') {
      router = routerMap[item.router]
      routeCfg = item
    }
    // 从 router 和 routeCfg 解析路由
    if (!router) {
      console.warn(`can't find register for router ${routeCfg.router}, please register it in advance.`)
    } else {
      const route = {
        path: routeCfg.path || router.path || routeCfg.router,
        name: routeCfg.name || router.name,
        component: router.component,
        redirect: routeCfg.redirect || router.redirect,
        meta: {
          authority: routeCfg.authority || router.authority || '*',
          icon: routeCfg.icon || router.icon,
          page: routeCfg.page || router.page
        }
      }
      if (routeCfg.invisible || router.invisible) {
        route.meta.invisible = true
      }
      if (routeCfg.children && routeCfg.children.length > 0) {
        route.children = parseRoutes(routeCfg.children, routerMap)
      }
      routes.push(route)
    }
  })
  return routes
}

/**
 * 加载路由
 * @param router 应用路由实例
 * @param store 应用的 vuex.store 实例
 * @param i18n 应用的 vue-i18n 实例
 * @param routesConfig 路由配置
 */
function loadRoutes({router, store, i18n}, routesConfig) {
  // 如果 routesConfig 有值，则更新到本地，否则从本地获取
  if (routesConfig) {
    store.commit('account/setRoutesConfig', routesConfig)
  } else {
    routesConfig = store.getters['account/routesConfig']
  }
  // 如果开启了异步路由，则加载异步路由配置
  const asyncRoutes = store.state.setting.asyncRoutes
  if (asyncRoutes) {
    if (routesConfig && routesConfig.length > 0) {
      const routes = parseRoutes(routesConfig, routerMap)
      formatAuthority(routes)
      const finalRoutes = mergeRoutes(router.options.routes, routes)
      router.options = {...router.options, routes: finalRoutes}
      router.matcher = new Router({...router.options, routes:[]}).matcher
      router.addRoutes(finalRoutes)
    }
  }
  // 提取路由国际化数据
  mergeI18nFromRoutes(i18n, router.options.routes)
  // 初始化Admin后台菜单数据
  const rootRoute = router.options.routes.find(item => item.path === '/')
  const menuRoutes = rootRoute && rootRoute.children
  if (menuRoutes) {
    store.commit('setting/setMenuData', menuRoutes)
  }
}

/**
 * 合并路由
 * @param target {Route[]}
 * @param source {Route[]}
 * @returns {Route[]}
 */
function mergeRoutes(target, source) {
  const routesMap = {}
  target.forEach(item => routesMap[item.path] = item)
  source.forEach(item => routesMap[item.path] = item)
  return Object.values(routesMap)
}

/**
 * 格式化路由的权限配置
 * @param routes
 */
function formatAuthority(routes) {
  routes.forEach(route => {
    const meta = route.meta
    if (meta) {
      let authority = {}
      if (!meta.authority) {
        authority.permission = '*'
      }else if (typeof meta.authority === 'string') {
        authority.permission = meta.authority
      } else if (typeof meta.authority === 'object') {
        authority = meta.authority
        const {role} = authority
        if (typeof role === 'string') {
          authority.role = [role]
        }
      } else {
        console.log(typeof meta.authority)
      }
      meta.authority = authority
    } else {
      route.meta = {
        authority: {permission: '*'}
      }
    }
    if (route.children) {
      formatAuthority(route.children)
    }
  })
}

/**
 * 从路由 path 解析 i18n key
 * @param path
 * @returns {*}
 */
function getI18nKey(path) {
  const keys = path.split('/').filter(item => !item.startsWith(':') && item != '')
  keys.push('name')
  return keys.join('.')
}

/**
 * 加载导航守卫
 * @param guards
 * @param options
 */
function loadGuards(guards, options) {
  const {beforeEach, afterEach} = guards
  const {router} = options
  beforeEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.beforeEach((to, from, next) => guard(to, from, next, options))
    }
  })
  afterEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.afterEach((to, from) => guard(to, from, options))
    }
  })
}

export {parseRoutes, loadRoutes, formatAuthority, getI18nKey, loadGuards}
