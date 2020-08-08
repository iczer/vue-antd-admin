---
title: 服务端交互
lang: zh-CN
---
# 服务端交互
数据服务是一个应用的灵魂，它驱动着应用的各个功能模块的正常运转。Vue Antd Admin 在 service 模块封装了服务端交互，通过 API 的形式可以和任何技术栈的服务端应用一起工作。
## 服务交互流程
在 Vue Antd Admin 中，服务端交互流程如下：
* 组件内调用 service 服务 API
* service 服务 API 封装请求数据，通过 request.js 发送请求
* 组件获取 service 返回的数据，更新视图数据或触发其它行为  

我们以登录为例，Login.vue 组件内，用户输入账号密码，点击登录，调用 services/user/login api
```vue {5,17}
<template>
  ...
</template>
<script>
import {login} from '@/services/user'
...
export default {
  name: 'Login',
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const name = this.form.getFieldValue('name')
          const password = this.form.getFieldValue('password')
          login(name, password).then(res => this.afterLogin(res))
        }
      })
    }
  }
}
</script>
```
`services/user/login` 封装账户密码数据，通过 `request.js` 发送登录服务请求
```js
import {request, METHOD} from '@/utils/request'
/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
async function login(name, password) {
  return request(LOGIN, METHOD.POST, {
    name: name,
    password: password
  })
}
```
Login.vue 获取登录服务返回的数据，进行后续操作
```vue {14,18-23}
<template>
  ...
</template>
<script>
import {login} from '@/services/user'
...
export default {
  name: 'Login',
  methods: {
    onSubmit (e) {
      this.form.validateFields((err) => {
        if (!err) {
          ...
          login(name, password).then(res => this.afterLogin(res))
        }
      })
    },
    afterLogin(res) {
      if (res.data.code >= 0) {                 //登录成功
        ...
      } else {                                  //登录失败
        this.error = loginRes.message
      }
    }
  }
}
</script>
```
## 服务模块结构
服务模块结构如下：
```bash
...
├── src
│   └── services                # 数据服务模块
│       ├── user.js             # 用户数据服务
│       ├── product.js          # 产品服务
│       ...           
│       ├── api.js              # api 地址管理
│       └── index.js            # 服务模块导出
...
│   └── utils                   # 数据服务模块
│       ├── request.js          # 基于 axios 的 http 请求工具
...
```
services 文件夹下， api.js 用于服务请求地址的统一管理，index.js 用于模块化导出服务，其它 *.js 文件对应各个服务模块。
## request.js
request.js 基于 axios 封装了一些常用的函数，如下：  
```js
export {
  METHOD,                 //http method 常量
  AUTH_TYPE,              //凭证认证类型 常量
  request,                //http请求函数
  setAuthorization,       //设置身份凭证函数
  removeAuthorization,    //移除身份凭证函数
  checkAuthorization      //检查身份凭证是否过期函数
}
```
:::tip
凭证认证类型默认为 [Bearer](https://www.jianshu.com/p/8f7009456abc)，你可以根据自己的需要实现其它类型的认证
:::
## Base url 配置
你可以在项目根目录下的环境变量文件(.env 和 .env.development)中配置你的 API 服务 base url 地址。

生产环境，.env 文件
```properties
VUE_APP_API_BASE_URL=https://www.server.com
```
开发环境，.env.development 文件：
```properties
VUE_APP_API_BASE_URL=https://localhost:8000
```
## 跨域设置
在开发环境中，通常我们的Vue应用和服务应用运行在不同的地址或端口上。我们可以通过简单的设置，代理前端请求，来避免跨域问题。如下：  

首先，在 services/api.js 文件中设置 API_PROXY_PREFIX 常量，BASE_URL 像下面这样设置：
```js {2,4}
//跨域代理前缀
const API_PROXY_PREFIX='/api'
//base url
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
//导出api服务地址
module.exports = {
  LOGIN: `${BASE_URL}/login`,
  ROUTES: `${BASE_URL}/routes`
}
```
然后，在 vue.config.js 文件中配置代理：
```js
model.exports = {
  devServer: {
    proxy: {
      '/api': {               //此处要与 /services/api.js 中的 API_PROXY_PREFIX 值保持一致
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```
:::tip
此代理配置仅适用于开发环境，生产环境的跨域代理请在自己的web服务器配置。
:::
