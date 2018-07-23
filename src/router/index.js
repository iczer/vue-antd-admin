import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard'
import Exception from '@/components/exception/Exception'
import NotFound from '@/components/exception/404'
import NotPermit from '@/components/exception/403'
import ServerError from '@/components/exception/500'
import Form from '@/components/form/Form'
import BasicForm from '@/components/form/BasicForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      icon: 'dashboard'
    },
    {
      path: '/form',
      name: '表单页',
      component: Form,
      icon: 'form',
      children: [
        {
          path: '/form/basic',
          name: '基础表单',
          component: BasicForm,
          icon: 'none'
        },
        {
          path: '/form/step',
          name: '分步表单',
          component: NotFound,
          icon: 'none'
        },
        {
          path: '/form/advanced',
          name: '高级表单',
          component: NotFound,
          icon: 'none'
        }
      ]
    },
    {
      path: '/list',
      name: '列表页',
      component: Exception,
      icon: 'table',
      children: [
        {
          path: '/form/query',
          name: '查询表格',
          component: NotFound,
          icon: 'none'
        },
        {
          path: '/form/primary',
          name: '标准表格',
          component: NotFound,
          icon: 'none'
        },
        {
          path: '/form/card',
          name: '卡片表格',
          component: NotFound,
          icon: 'none'
        },
        {
          path: '/form/search',
          name: '搜索表格',
          component: NotFound,
          icon: 'none'
        }
      ]
    },
    {
      path: '/detail',
      name: '详情页',
      icon: 'profile',
      component: Exception,
      children: [
        {
          path: '/detail/basic',
          name: '基础详情页',
          icon: 'none',
          component: NotFound
        },
        {
          path: '/detail/advanced',
          name: '高级详情页',
          icon: 'none',
          component: NotFound
        }
      ]
    },
    {
      path: '/result',
      name: '详情页',
      icon: 'check-circle-o',
      component: Exception,
      children: [
        {
          path: '/result/success',
          name: '成功',
          icon: 'none',
          component: NotFound
        },
        {
          path: '/result/failure',
          name: '失败',
          icon: 'none',
          component: NotFound
        }
      ]
    },
    {
      path: '/exception',
      name: '异常页',
      icon: 'warning',
      component: Exception,
      children: [
        {
          path: '/exception/404',
          name: '404',
          icon: 'none',
          component: NotFound
        },
        {
          path: '/exception/403',
          name: '403',
          icon: 'none',
          component: NotPermit
        },
        {
          path: '/exception/500',
          name: '500',
          icon: 'none',
          component: ServerError
        }
      ]
    }
  ]
})
