import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard'
import MiniChart from '@/components/chart/MiniChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Dashboard
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/chart',
      name: 'chart',
      component: MiniChart
    }
  ]
})
