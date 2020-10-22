---
title: 异步路由和菜单
lang: zn-CN
---
# 异步路由和菜单
在现实业务中，存在这样的场景，系统的路由和菜单会根据用户的角色变化而变化，或者路由菜单根据用户的权限动态生成。我们为此准备了一套完整的异步加载方案，
可以让你很方便的从服务端加载路由和菜单配置，并应用到系统中。
## 异步加载路由
动态路由的实现主要有以下四个步骤：
### 开启异步路由设置
在 `/config/config.js` 文件中设置 `asyncRoutes` 的值为 true:
```js {7}
module.exports = {
  theme: {
    color: '#13c2c2',
    mode: 'night'
  },
  multiPage: true,
  asyncRoutes: true,       //异步加载路由，true:开启，false:不开启
  animate: {
    name: 'roll',
    direction: 'default'
  }
}
```
### 注册路由组件
基础路由组件包含路由基本配置和对应的视图组件，我们统一在 `/router/async/router.map.js` 文件中注册它们。它和正常的路由配置基本无异，相当于把完整的路由拆分成单个的路由配置进行注册，为后面的路由动态配置打好基础。  
一个单独的路由组件注册示例如下：
```jsx
registerName: {                               //路由组件注册名称，唯一标识
  path: 'path',                               //路由path，可缺省，默认取路由注册名称 registerName 的值
  name: '演示页',                             //路由名称
  redirect: '/login',                         //路由重定向
  component: () => import('@/pages/demo'),    //路由视图
  icon: 'permission',                         //路由的菜单icon，会注入到路由元数据meta中
  invisible: false,                           //是否隐藏菜单项，true 隐藏，false 不隐藏，会注入到路由元数据meta中。
  authority: {                                //路由权限配置，会注入到路由元数据meta中。可缺省，默认为 ‘*’, 即无权限限制
    permission: 'form',                       //路由需要的权限  
    role: 'admin'                             //路由需要的角色。当permission未设置，通过 role 检查权限
  },                     
  page: {                                     //路由的页面数据，会注入到路由元数据meta中
    title: '演示页',                          //页面标题
    breadcrumb: ['首页', '演示页']            //页面面包屑
  }             
}
```

:::details 点击查看完整的路由注册示例：
```js
// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  demo: {
    name: '演示页',
    renderMenu: false,
    component: () => import('@/pages/demo')
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
  root: {
    path: '/',
    name: '首页',
    redirect: '/login',
    component: view.tabs
  },
  parent1: {
    name: '父级路由1',
    icon: 'dashboard',
    component: view.blank
  },
  parent2: {
    name: '父级路由2',
    icon: 'form',
    component: view.page
  },
  exception: {
    name: '异常页',
    icon: 'warning',
    component: view.blank
  }
}
export default routerMap
```
:::
### 配置基本路由
如果没有任何路由，你的应用是无法访问的，所以我们需要在本地配置一些基本的路由，比如登录页、404、403 等。你可以在 `/router/async/config.async.js` 文件中配置一些本地必要的路由。如下：
```js
const routesConfig = [
  'login',                      //匹配 router.map.js 中注册的 registerName = login 的路由
  'root',                       //匹配 router.map.js 中注册的 registerName = root 的路由
  {
    router: 'exp404',           //匹配 router.map.js 中注册的 registerName = exp404 的路由
    path: '*',                  //重写 exp404 路由的 path 属性
    name: '404'                 //重写 exp404 路由的 name 属性
  },
  {
    router: 'exp403',           //匹配 router.map.js 中注册的 registerName = exp403 的路由
    path: '/403',               //重写 exp403 路由的 path 属性
    name: '403'                 //重写 exp403 路由的 name 属性
  }
]
```
完成配置后，即可通过 `routesConfig` 和已注册的 `routerMap` 生成 [router.options.routes](https://router.vuejs.org/zh/api/#router-%E6%9E%84%E5%BB%BA%E9%80%89%E9%A1%B9) 配置，如下：
```js
const options = {
  routes: parseRoutes(routesConfig, routerMap)
}
```
:::details 点击查看完整的 config.async.js 代码
```js
import routerMap from './router.map'
import {parseRoutes} from '@/utils/routerUtil'

// 异步路由配置
const routesConfig = [
  'login',
  'root',
  {
    router: 'exp404',
    path: '*',
    name: '404'
  },
  {
    router: 'exp403',
    path: '/403',
    name: '403'
  }
]
const options = {
  routes: parseRoutes(routesConfig, routerMap)
}
export default options
```
:::
完成以上设置后，本地就已经有了包含 login、404、403 页面的路由，并且这些路由是可以直接访问的。
### 异步获取路由配置
当用户登录后（或者其它的前提条件），你可能想根据不同用户加载不同的路由和菜单。
那么我们就需要先从后端服务获取异步路由配置，后端返回的异步路由配置 `routesConfig` 是一个异步路由配置数组， 应当如下格式：
```jsx
[{
  router: 'root',                           //匹配 router.map.js 中注册名 registerName = root 的路由
  children: [                               //root 路由的子路由配置
    {
      router: 'dashboard',                  //匹配 router.map.js 中注册名 registerName = dashboard 的路由
      children: ['workplace', 'analysis'],  //dashboard 路由的子路由配置，依次匹配 registerName 为 workplace 和 analysis 的路由
    },
    {
      router: 'form',                       //匹配 router.map.js 中注册名 registerName = form 的路由
      children: [                           //form 路由的子路由配置
        'basicForm',                        //匹配 router.map.js 中注册名 registerName = basicForm 的路由
        'stepForm',                         //匹配 router.map.js 中注册名 registerName = stepForm 的路由
        {
          router: 'advanceForm',            //匹配 router.map.js 中注册名 registerName = advanceForm 的路由
          path: 'advance'                   //重写 advanceForm 路由的 path 属性
        }
      ]   
    },
    {
      router: 'basicForm',                  //匹配 router.map.js 中注册名 registerName = basicForm 的路由
      name: '验权表单',                     //重写 basicForm 路由的 name 属性
      icon: 'file-excel',                   //重写 basicForm 路由的 icon 属性
      authority: 'form'                     //重写 basicForm 路由的 authority 属性
    }
  ]
}]
```
其中 `router` 属性 对应 `router.map.js` 中已注册的`基础路由`的注册名称 `registerName`，`children` 属性为路由的嵌套子路由配置。  
有些情况下你可能想重写已注册路由的属性，你可以为 `routesConfig` 配置同名属性去覆盖它。如上面的`验权表单`路由覆盖了注册路由的 `name`、`icon`、`authority` 属性。

### 加载路由并应用
我们提供了一个路由加载工具，你只需调用 `/utils/routerUtil.js` 中的 `loadRoutes` 方法加载上一步获取到的 `routesConfig` 即可，如下：
```js {3}
getRoutesConfig().then(result => {
  const routesConfig = result.data.data
  loadRoutes(routesConfig)
})
```
至此，异步路由的加载就完成了，你可以访问异步加载的路由了。
:::tip
上面获取异步路由的代码，在 /pages/login/Login.vue 文件中可以找到。   
loadRoutes 方法会合并 /router/async/config.async.js 文件中配置的基本路由。
:::
:::details 点击查看 loadRoutes 的详细代码
```js
/**
 * 加载路由
 * @param routesConfig 路由配置
 */
function loadRoutes(routesConfig) {
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
  // 初始化Admin后台菜单数据
  const rootRoute = router.options.routes.find(item => item.path === '/')
  const menuRoutes = rootRoute && rootRoute.children
  if (menuRoutes) {
    mergeI18nFromRoutes(i18n, menuRoutes)
    store.commit('setting/setMenuData', menuRoutes)
  }
}
```
:::

## 异步加载菜单
Vue Antd Admin 的菜单，是根据路由配置自动生成的，默认获取根路由 `‘/’` 下所有子路由作为菜单配置。  
当你完成了异步路由的加载，菜单也会随之改变，无需你做其它额外的操作。主要代码如下：
```js
// 初始化Admin后台菜单数据
  const rootRoute = router.options.routes.find(item => item.path === '/')
  const menuRoutes = rootRoute && rootRoute.children
  if (menuRoutes) {
    mergeI18nFromRoutes(i18n, menuRoutes)
    store.commit('setting/setMenuData', menuRoutes)
  }
```
:::tip
如果你不想从根路由 `‘/’` 下获取菜单数据，可以根据自己的需求更改。
:::
