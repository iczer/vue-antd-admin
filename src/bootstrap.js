// 应用启动时需要执行的操作放在这里
import {loadRoutes} from '@/utils/routerUtil'

/**
 * 启动引导方法
 * @param router 应用的路由实例
 * @param store 应用的 vuex.store 实例
 * @param i18n 应用的 vue-i18n 实例
 */
function bootstrap({router, store, i18n}) {
  // 加载本地存储的异步路由
  const localRoutes = localStorage.getItem('routes')
  if (localRoutes) {
    try {
      const routesConfig = JSON.parse(localRoutes)
      loadRoutes(routesConfig, router, store, i18n)
    } catch (e) {
      console.error(e.message)
    }
  }
}

export default bootstrap
