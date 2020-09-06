---
title: 拦截器配置
lang: zn-CN
---
# 拦截器配置
Vue Antd Admin 基于 aixos 封装了 http 通信功能，我们可以为 http 请求响应配置一些拦截器。拦截器统一配置在 /utils/axios-interceptors.js 文件中。
## 请求拦截器
你可以为每个请求拦截器配置 `onFulfilled` 或 `onRejected` 两个钩子函数。
### onFulfilled
我们会为 onFulfilled 钩子函数注入 config 和 options 两个参数：
* `config: AxiosRequestConfig`: axios 请求配置，详情参考 [axios 请求配置](http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE)
* `options: Object`: 应用配置，包含: {router, i18n, store, message}，可根据需要扩展。

### onRejected
我们会为 onFulfilled 钩子函数注入 error 和 options 两个参数：
* `error: Error`: axios 请求错误对象
* `options: Object`: 应用配置，包含: {router, i18n, store, message}，可根据需要扩展。  
  
如下，为一个完整的请求拦截器配置：
```js
const tokenCheck = {
  // 发送请求之前做些什么
  onFulfilled(config, options) {
    const {message} = options
    const {url, xsrfCookieName} = config
    if (url.indexOf('login') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
      message.warning('认证 token 已过期，请重新登录')
    }
    return config
  },
  // 请求出错时做点什么
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}
```
## 响应拦截器
响应拦截器也同样可以配置 `onFulfilled` 或 `onRejected` 两个钩子函数。
### onFulfilled
我们会为 onFulfilled 钩子函数注入 response 和 options 两个参数：
* `response: AxiosResponse`: axios 响应对象，详情参考 [axios 响应对象](http://www.axios-js.com/zh-cn/docs/#%E5%93%8D%E5%BA%94%E7%BB%93%E6%9E%84)
* `options: Object`: 应用配置，包含: {router, i18n, store, message}，可根据需要扩展。

### onRejected
我们会为 onFulfilled 钩子函数注入 error 和 options 两个参数：
* `error: Error`: axios 请求错误对象
* `options: Object`: 应用配置，包含: {router, i18n, store, message}，可根据需要扩展。 

如下，为一个完整的响应拦截器配置：
```js
const resp401 = {
  // 响应数据之前做点什么
  onFulfilled(response, options) {
    const {message} = options
    if (response.status === 401) {
      message.error('无此接口权限')
    }
    return response
  },
  // 响应出错时做点什么
  onRejected(error, options) {
    const {message} = options
    if (response.status === 401) {
      message.error('无此接口权限')
    }
    return Promise.reject(error)
  }
}
```
## 导出拦截器
定义好拦截器后，只需在 axios-interceptors.js 文件中导出即可。分为两类，`请求拦截器`和`响应拦截器`。如下：
```js
export default {
  request: [tokenCheck], // 请求拦截
  response: [resp401] // 响应拦截
}
```

:::details 点击查看完整的拦截器配置示例
```js
import Cookie from 'js-cookie'
// 401拦截
const resp401 = {
  onFulfilled(response, options) {
    const {message} = options
    if (response.status === 401) {
      message.error('无此接口权限')
    }
    return response
  },
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

const resp403 = {
  onFulfilled(response, options) {
    const {message} = options
    if (response.status === 403) {
      message.error(`请求被拒绝`)
    }
    return response
  }
}

const reqCommon = {
  onFulfilled(config, options) {
    const {message} = options
    const {url, xsrfCookieName} = config
    if (url.indexOf('login') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
      message.warning('认证 token 已过期，请重新登录')
    }
    return config
  },
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

export default {
  request: [reqCommon], // 请求拦截
  response: [resp401, resp403] // 响应拦截
}
```
:::