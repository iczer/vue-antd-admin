import Vue from 'vue'
import Router from 'vue-router'
import {checkAuthorization} from '@/utils/request'
import {options, loginIgnore} from './config'

Vue.use(Router)

const router =  new Router(options)

// 登录拦截
router.beforeEach((to, from, next) => {
  if (!loginIgnore.includes(to) && !checkAuthorization()) {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
