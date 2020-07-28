import routerMap from '@/router/router.map'
import {mergeI18nFromRoutes} from '@/utils/i18n'
import Router from 'vue-router'
import {loginIgnore} from '@/router'
import {checkAuthorization} from '@/utils/request'

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
    if (typeof item === 'string') {
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
 * @param routesConfig
 */
function loadRoutes({router, store, i18n}, routesConfig) {
  // 如果 routesConfig 有值，则更新到本地localStorage，否则从本地localStorage获取
  if (routesConfig) {
    store.commit('account/setRoutesConfig', routesConfig)
  } else {
    routesConfig = store.getters['account/routesConfig']
  }
  if (routesConfig && routesConfig.length > 0) {
    const routes = parseRoutes(routesConfig, routerMap)
    router.matcher = new Router(router.options).matcher
    router.addRoutes(routes)
    const menuRoutes = routes.find(item => item.path === '/').children
    mergeI18nFromRoutes(i18n, menuRoutes)
    store.commit('setting/setMenuData', menuRoutes)
  }
}

/**
 * 登录守卫
 * @param router 应用路由实例
 */
function loginGuard(router) {
  router.beforeEach((to, from, next) => {
    if (!loginIgnore.includes(to) && !checkAuthorization()) {
      next({path: '/login'})
    } else {
      next()
    }
  })
}

/**
 * 权限守卫
 * @param router 应用路由实例
 * @param store 应用的 vuex.store 实例
 */
function authorityGuard(router, store) {
  router.beforeEach((to, form, next) => {
    const permissions = store.getters['account/permissions']
    const roles = store.getters['account/roles']
    if (!hasPermission(to, permissions) && !hasRole(to, roles)) {
      next({path: '/403'})
    } else {
      next()
    }
  })
}

/**
 * 判断是否有路由的权限
 * @param route 路由
 * @param permissions 用户权限集合
 * @returns {boolean|*}
 */
function hasPermission(route, permissions) {
  const authority = route.meta.authority || '*'
  let required = '*'
  if (typeof authority === 'string') {
    required = authority
  } else if (typeof authority === 'object') {
    required = authority.permission
  }
  return required === '*' || (permissions && permissions.findIndex(item => item === required || item.id === required) !== -1)
}

/**
 * 判断是否有路由需要的角色
 * @param route 路由
 * @param roles 用户角色集合
 */
function hasRole(route, roles) {
  const authority = route.meta.authority || '*'
  let required = undefined
  if (typeof authority === 'object') {
    required = authority.role
  }
  return authority === '*' || (required && roles.findIndex(item => item === required || item.id === required) !== -1)
}

export {parseRoutes, loadRoutes, loginGuard, authorityGuard}
