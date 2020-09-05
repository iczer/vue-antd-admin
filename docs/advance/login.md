---
title: 登录认证
lang: zn-CN
---
# 登录认证
Vue Antd Admin 使用 js-cookie.js 管理用户的 token，结合 axios 配置，可以为每个请求头加上 token 信息。

## token名称
后端系统通常会从请求 header 中获取用户的 token，因此我们需要配置好 token 名称，好让后端能正确的识别到用户 token。
Vue Antd Admin 默认token 名称为 `Authorization`，你可以在 /utils/request.js 中修改它。
```js{5}
import axios from 'axios'
import Cookie from 'js-cookie'

// 跨域认证信息 header 名
const xsrfHeaderName = 'Authorization'
...
```
## token 设置
调用登录接口后拿到用户的 token 和 token 过期时间（如无过期时间，可忽略），并使用 /utils/request.js #setAuthorization 方法保存token。
```js{5}
import {setAuthorization} from '@/utils/request'

login(name, password).then(res => {
  const {token, expireAt} = res.data
  setAuthorization({token, expireAt: new Date(expireAt)})
})
```
## token 校验
Vue Antd Admin 默认添加了登录导航守卫，如检查到本地cookie 中不包含 token 信息，则会拦截跳转至登录页。你可以在 /router/index.js 中配置
不需要登录拦截的路由
```js
// 不需要登录拦截的路由配置
const loginIgnore = {
  names: ['404', '403'],      //根据路由名称匹配
  paths: ['/login'],   //根据路由fullPath匹配
  /**
   * 判断路由是否包含在该配置中
   * @param route vue-router 的 route 对象
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path)
  }
}
```
或者在 /router/guards.js 中移出登录守卫
```diff
...
export default {
-  beforeEach: [loginGuard, authorityGuard, redirectGuard],
+  beforeEach: [authorityGuard, redirectGuard],
  afterEach: []
}
```
## Api
### setAuthorization(auth, authType)
来源：/utils/request.js  
该方法用于保存用户 token，接收两个参数:  
* **auth**   
认证信息，包含 token、expireAt 等认证数据。  
* **authType**  
认证类型，默认为 `AUTH_TYPE.BEARER`（AUTH_TYPE.BEARER 默认会给token 加上 Bearer 识别前缀），可根据自己的认证类型自行扩展。  

### checkAuthorization(authType)
该方法用于校验用户 token 是否过期，接收一个参数:  
* **authType**  
认证类型，默认为 `AUTH_TYPE.BEARER`。 

### removeAuthorization(authType)
该方法用于移出用户本地存储的 token，接收一个参数:  
* **authType**  
认证类型，默认为 `AUTH_TYPE.BEARER`。
:::tip
以上 Api 均可在 /utils/request.js 文件中找到。
:::