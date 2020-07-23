---
title: 路由和菜单
lang: zh-CN
---
# 路由和菜单
路由和菜单起到组织一个应用的关键骨架的作用，Vue Antd Admin 使用 [vue-router](https://router.vuejs.org/zh/) 来配置和管理我们的路由和菜单。
## 基本结构
得益于 vue-router 路由配置的可扩展性，Vue Antd Admin 通过结合 router 配置文件、基本算法及 [menu.js](https://github.com/iczer/vue-antd-admin/blob/master/src/components/menu/menu.js) 菜单生成工具，搭建了路由和菜单的基本框架，主要涉及以下几个模块/功能：

|功能        |配置                            |
|:----------|:-------------------------------|
|*路由管理*  |通过 [vue-router](https://router.vuejs.org/zh/) 的路由规则进行管理和配置|
|*菜单生成*  |根据路由配置自动生成菜单，菜单项名称、图标和层级等全部可以通过路由配置进行自定义|
|*面包屑*    |布局组件 [PageLayout](https://github.com/iczer/vue-antd-admin/blob/master/src/layouts/PageLayout.vue) 提取当前页面路由，并根据当前路由层次关系自动生成面包屑，当然你也可以自定义面包屑|
|*页面标题*  |同面包屑，布局组件 [PageLayout](https://github.com/iczer/vue-antd-admin/blob/master/src/layouts/PageLayout.vue) 根据提取到的当前页面的路由名称设置为页面标题，你也同样可以自定义标题|

## 路由
Vue Antd Admin 的路由配置完全遵循 vue-router 的 [routes 配置规则](https://router.vuejs.org/zh/api/#routes)。
另外我们还在 routes 的元数据属性 [meta](https://router.vuejs.org/zh/guide/advanced/meta.html#%E8%B7%AF%E7%94%B1%E5%85%83%E4%BF%A1%E6%81%AF) 中注入了三个属性 icon、invisible 和 page，它们将在生成菜单和页头时发挥作用。配置示例如下：
```js {7,13}
const options = {
  routes: [{
    path: '/',
    name: '首页',
    component: TabsView,
    meta: {
      invisible: true
    },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      meta: {
        icon: 'dashboard'
      },
      component: BlankView,
      children: [{
        path: 'workplace',
        name: '工作台',
        component: () => import('@/pages/dashboard/workplace/WorkPlace'),
      }, {
        path: 'analysis',
        name: '分析页',
        component: () => import('@/pages/dashboard/analysis/Analysis'),
      }]
    }]
  }]
}
```
完整配置示例，请查看 [src/router/config.js](https://github.com/iczer/vue-antd-admin/blob/master/src/router/config.js)

## 菜单
Admin 系统的菜单直接通过路由配置生成，路由属性和菜单功能对应关系如下

|路由属性|对应菜单功能|
|:-----------------|:-------|
|**name**          |菜单名称 |
|**path**          |点击菜单时的跳转链接|
|**meta.icon**     |菜单图标，图标使用 ant-design-vue 图标库，对应 [Icon](https://www.antdv.com/components/icon-cn/#API) 组件 的 type 属性|  
|**meta.invisible**|是否不将此路由项渲染为菜单项，默认false；如设置为 true，则生成菜单时将忽略此路由|

假如使用上面 [路由](#路由) 文档中的 [配置示例](#路由)，将会生成如下菜单：

![menu-demo](../assets/menu-demo.png)
实际项目中，我们是在 AdminLayout 组件创建之前，提取 router 配置中根路由 '/' 下所有子路由配置，
并将此配置传递给 menu.js 插件，从而生成菜单。如下：
```vue {4,12,13,14}
<template>
  <a-layout :class="['admin-layout'...]">
    ...
    <side-menu :menuData="menuData".../>
  </a-layout>
</template>
<script>
import ...
export default {
  name: 'AdminLayout',
  ...
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children
  }
}
</script>
```
详细代码可查看 [layouts/AdminLayout#L83](https://github.com/iczer/vue-antd-admin/blob/master/src/layouts/AdminLayout.vue#L83)。  
当然你也可以不使用 router 配置生成菜单，你只需按照配置规则给菜单传递你所定义配置即可。菜单组件配置规则如下：
```jsx {}
[{
  name: '菜单标题',
  path: '菜单路由',
  meta: {
    icon: '菜单图标',
    invisible: 'boolean, 是否隐藏此菜单项, 默认 false',
  },
  children: [ //子菜单配置
    {
      name: '子菜单标题',
      path: '子菜单路由',
      meta: {
        icon: '子菜单图标',
        invisible: 'boolean, 是否隐藏此菜单项, 默认 false',
      },
    }
  ]
}]
```
更多细节可查看 [components/menu/menu.js](https://github.com/iczer/vue-antd-admin/blob/master/src/components/menu/menu.js)

## 面包屑
面包屑由 [PageHeader](https://github.com/iczer/vue-antd-admin/blob/master/src/components/page/PageHeader.vue) 实现，PageLayout 组件会从当前页面路由提取面包屑配置（如未设置，则根据当前路由层次关系生成面包屑）。所以只要页面中使用了 PageLayout 布局或者它的父级组件使用了 PageLayout 布局，面包屑都将自动生成。  

当然，如果你想在某个页面自定义面包屑，只需在对应的路由元数据 meta 中定义 page.breadcrumb 属性即可。Vue Antd Admin 将会优先使用路由元数据 meta 中定义的面包屑配置。  

比如，想自定义工作台页面面包屑，可以在工作台的 route 配置中如下设置：
```jsx {5,6,7}
{
  path: 'workplace',
  name: '工作台',
  meta: {
    page: {
      breadcrumb: ['首页', 'Dashboard', '自定义']
    }
  },
  component: () => import('@/pages/dashboard/workplace/WorkPlace'),
}
```
更多细节可查看 [layouts/PageLayout.vue#L55](https://github.com/iczer/vue-antd-admin/blob/master/src/layouts/PageLayout.vue#L55)
## 页面标题
页面标题的实现方式与面包屑基本一致，也是由 PageLayout 组件从当前页面路由提取标题（如未设置，则提取当前路由名称作为标题）。 
 
如果你想自定义页面标题，在页面对应的路由元数据 meta 中定义 page.title 属性即可，如下示例，定义了工作台页面的标题：
```jsx {5,6,7}
{
  path: 'workplace',
  name: '工作台',
  meta: {
    page: {
      title: '自定义标题'
    }
  },
  component: () => import('@/pages/dashboard/workplace/WorkPlace'),
}
```
更多细节可查看 [layouts/PageLayout.vue#L48](https://github.com/iczer/vue-antd-admin/blob/master/src/layouts/PageLayout.vue#L48)
