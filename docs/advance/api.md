---
title: 全局API
lang: zn-CN
---
# 全局API
我们提供了一些全局Api，在日常功能开发中或许会有帮助，它们均被绑定到了页面组件或子组件实例上。  
在组件内可以直接通过`this.$[apiName]`的方式调用。如下：

## 多页签
### $closePage(closeRoute, nextRoute)
该api用于关闭当前已打开的页签，接收两个参数：
* **closeRoute**  
要关闭的页签对应的 route 对象，可简写为路由的 fullPath 字符串值。
* **nextRoute**  
关闭页签要后跳转的 route 对象，可不传，不传则会自动选择打开页签（临近原则）。

### $refreshPage(route)
该api用于刷新路由对应的页签，接收一个参数：
* **route**  
要刷新的页签对应的 route 对象，可简写为路由的 fullPath 字符串值。

### $openPage(route, title)
该api用于打开一个新页签，接收两个参数：
* **route**  
要打开的页签对应的 route 对象，可简写为路由的 fullPath 字符串值。
* **title**  
设置打开页签的标题，可不传。

### $setPageTitle(route, title)
该api用于设置页签的标题，接收两个参数：
* **route**  
要设置的页签对应的 route 对象，可简写为路由的 fullPath 字符串值。
* **title**  
页签的标题。

## 权限
### $auth(check, type)
该api可以用于操作权限校验，接收两个参数：
* **check**  
需要要校验的操作权限
* **type**  
操作权限校验类别，可选 `permission` 和 `role`，即通过权限校验还是角色进行校验，可不传（不传的话，会对两种类型都进行匹配，任意一种匹配成功即校验通过）。