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
```
## 目录结构
我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
├── docs                     # 使用文档
├── public
│   └── favicon.png          # favicon
│   └── index.html           # 入口 HTML
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── config               # 系统配置
│   ├── layouts              # 通用布局
│   ├── mock                 # 本地 mock 数据
│   ├── pages                # 页面组件和通用模板
│   ├── plugins              # vue 插件
│   ├── router               # 路由配置
│   ├── store                # vuex 状态管理配置
│   ├── theme                # 主题相关
│   ├── utils                # js 工具
│   └── App.vue              # 应用入口组件
│   └── main.js              # 应用入口js
├── package.json             # package.json
├── README.md                # README.md
└── vue.config.js            # vue 配置文件
```
## 本地开发
启动服务
```bash
$ yarn serve
```
启动成功后，会看到一个本地预览地址，通常是 http://localhost:8080 。接下来就可以修改代码，并实时预览修改结果啦！
