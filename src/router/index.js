import Vue from 'vue'
import Router from 'vue-router'
// import {options, loginIgnore} from './config'  //本地路由配置
import {options, loginIgnore} from './config.async' //异步路由配置

Vue.use(Router)
const router =  new Router({...options})

export {loginIgnore}
export default router
