import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard'
import Exception from '@/components/exception/Exception'
import NotFound from '@/components/exception/404'
import NotPermit from '@/components/exception/403'
import ServerError from '@/components/exception/500'
import PageView from '@/components/layout/PageView'
import RouteView from '@/components/layout/RouteView'
import MenuView from '@/components/layout/MenuView'
import BasicForm from '@/components/form/BasicForm'
import StepForm from '@/components/form/stepForm/StepForm'
import AdvancedForm from '@/components/form/advancedForm/AdvancedForm'
import Success from '@/components/result/Success'
import Error from '@/components/result/Error'
import QueryList from '@/components/list/QueryList'
import StandardList from '@/components/list/StandardList'
import CardList from '@/components/list/CardList'
import SearchLayout from '@/components/list/search/SearchLayout'
import ArticleList from '@/components/list/search/ArticleList'
import ApplicationList from '@/components/list/search/ApplicationList'
import ProjectList from '@/components/list/search/ProjectList'
import WorkPlace from '@/components/dashboard/WorkPlace'
import Login from '@/components/login/Login'
import BasicDetail from '@/components/detail/BasicDetail'
import AdvancedDetail from '@/components/detail/AdvancedDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: Login,
      invisible: true
    },
    {
      path: '/',
      name: 'home',
      component: MenuView,
      redirect: '/login',
      icon: 'none',
      invisible: true,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: RouteView,
          icon: 'dashboard',
          children: [
            {
              path: '/dashboard/workplace',
              name: '工作台',
              component: WorkPlace,
              icon: 'none'
            },
            {
              path: '/dashboard/analysis',
              name: '分析页',
              component: Dashboard,
              icon: 'none'
            }
          ]
        },
        {
          path: '/form',
          name: '表单页',
          component: PageView,
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
              component: StepForm,
              icon: 'none'
            },
            {
              path: '/form/advanced',
              name: '高级表单',
              component: AdvancedForm,
              icon: 'none'
            }
          ]
        },
        {
          path: '/list',
          name: '列表页',
          component: PageView,
          icon: 'table',
          children: [
            {
              path: '/list/query',
              name: '查询表格',
              component: QueryList,
              icon: 'none'
            },
            {
              path: '/list/primary',
              name: '标准列表',
              component: StandardList,
              icon: 'none'
            },
            {
              path: '/list/card',
              name: '卡片列表',
              component: CardList,
              icon: 'none'
            },
            {
              path: '/list/search',
              name: '搜索列表',
              component: SearchLayout,
              icon: 'none',
              children: [
                {
                  path: '/list/search/article',
                  name: '文章',
                  component: ArticleList,
                  icon: 'none'
                },
                {
                  path: '/list/search/application',
                  name: '应用',
                  component: ApplicationList,
                  icon: 'none'
                },
                {
                  path: '/list/search/project',
                  name: '项目',
                  component: ProjectList,
                  icon: 'none'
                }
              ]
            }
          ]
        },
        {
          path: '/detail',
          name: '详情页',
          icon: 'profile',
          component: RouteView,
          children: [
            {
              path: '/detail/basic',
              name: '基础详情页',
              icon: 'none',
              component: BasicDetail
            },
            {
              path: '/detail/advanced',
              name: '高级详情页',
              icon: 'none',
              component: AdvancedDetail
            }
          ]
        },
        {
          path: '/result',
          name: '结果页',
          icon: 'check-circle-o',
          component: PageView,
          children: [
            {
              path: '/result/success',
              name: '成功',
              icon: 'none',
              component: Success
            },
            {
              path: '/result/error',
              name: '失败',
              icon: 'none',
              component: Error
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
    }
  ]
})
