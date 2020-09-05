---
title: 路由守卫
lang: zn-CN
---
# 路由守卫
Vue Antd Admin 使用 vue-router 实现路由导航功能，因此可以为路由配置一些守卫。  
我们统一把导航守卫配置在 router/guards.js 文件中。

## 前置守卫
Vue Antd Admin 为每个前置导航守卫函数注入 to,from,next,options 四个参数：
* `to: Route`: 即将要进入的目标[路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
* `from: Route`: 当前导航正要离开的路由对象
* `next: Function`: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。详情查看 [Vue Router #导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)
* `options: Object`: 应用配置，包含: {router, i18n, store, message}，可根据需要扩展。  
如下，是登录拦截导航守卫的定义
```js
const loginGuard = (to, from, next, options) => {
  const {message} = options
  if (!loginIgnore.includes(to) && !checkAuthorization()) {
    message.warning('登录已失效，请重新登录')
    next({path: '/login'})
  } else {
    next()
  }
}
```

## 后置守卫
你也可以定义后置导航守卫，Vue Antd Admin 为每个后置导航函数注入 to,from,options 三个参数：
* `to: Route`: 即将要进入的目标[路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
* `from: Route`: 当前导航正要离开的路由对象
* `options: Object`: 应用配置，包含: {router, i18n, store, message}，可根据需要扩展。  
如下，是一个后置导航守卫的定义
```js
const afterGuard = (to, from, options) => {
  const {store, message} = options
  // 做些什么
  message.info('do something')
}
```

## 导出守卫配置
定义好导航守卫后，只需按照类别在 guard.js 中导出即可。分为两类，`前置守卫`和`后置守卫`。如下：
```js
export default {
  beforeEach: [loginGuard, authorityGuard],
  afterEach: [afterGuard]
}
```

:::details 点击查看完整的导航守卫配置
```js
import {loginIgnore} from '@/router/index'
import {checkAuthorization} from '@/utils/request'

/**
 * 登录守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = (to, from, next, options) => {
  const {message} = options
  if (!loginIgnore.includes(to) && !checkAuthorization()) {
    message.warning('登录已失效，请重新登录')
    next({path: '/login'})
  } else {
    next()
  }
}

/**
 * 权限守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to, from, next, options) => {
  const {store, message} = options
  const permissions = store.getters['account/permissions']
  const roles = store.getters['account/roles']
  if (!hasAuthority(to, permissions, roles)) {
    message.warning(`对不起，您无权访问页面: ${to.fullPath}，请联系管理员`)
    next({path: '/403'})
  } else {
    next()
  }
}

/**
 * 后置守卫
 * @param to
 * @param form
 * @param options
 */
const afterGuard = (to, from, options) => {
  const {store, message} = options
  // 做些什么
  message.info('do something')
}

export default {
  beforeEach: [loginGuard, authorityGuard],
  afterEach: [afterGuard]
}
```
:::