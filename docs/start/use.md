---
title: 使用
lang: zh-CN
---
# 使用
## 准备
你的本地环境需要安装 yarn、node 和 git。我们的技术栈基于 ES2015+、Vue、Antd，提前学习这些知识会非常有帮助。
## 安装
克隆本项目到本地
```bash
$ git clone https://github.com/iczer/vue-antd-admin.git
```
安装依赖
```bash
$ yarn install
or
$ npm install
```
:::tip
master 分支是 Vue Antd Admin 的标准版代码，此分支代码适合用于用于学习研究，不推荐在此分支做正式开发。
我们在 basic 分支提供了 Vue Antd Admin 的基础版代码，正式开发请切换至此分支，以便于后续的版本更新。
:::
:::warning
如果基于 `master分支` 进行开发，在版本更新时遇到的代码冲突问题请自行解决，我们不对基于 `master分支` 开发时遇到的问题提供技术支持。  
再次强调，`master分支` 仅推荐用于学习参考，正式开发请切换至 `basic` 分支！！！
:::
## 目录结构
我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
├── docs                     # 使用文档
├── public
│   └── favicon.png          # favicon
│   └── index.html           # 入口 HTML
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 内置通用组件
│   ├── config               # 系统配置
│   ├── layouts              # 通用布局
│   ├── mock                 # 本地 mock 数据
│   ├── pages                # 页面组件和通用模板
│   ├── plugins              # vue 插件
│   ├── router               # 路由配置
│   ├── services             # 数据服务模块
│   ├── store                # vuex 状态管理配置
│   ├── theme                # 主题相关
│   ├── utils                # js 工具
│   ├── App.vue              # 应用入口组件
│   ├── bootstrap.js         # 应用启动引导js
│   └── main.js              # 应用入口js
├── package.json             # package.json
├── README.md                # README.md
└── vue.config.js            # vue 配置文件
```
## 本地开发
启动服务
```bash
$ yarn serve
or
$ npm run serve
```
启动成功后，会看到一个本地预览地址，通常是 http://localhost:8080 。接下来就可以修改代码，并实时预览修改结果啦！
