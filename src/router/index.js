import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/dashboard/Analysis'
import NotFound from '@/pages/exception/404'
import NotPermit from '@/pages/exception/403'
import ServerError from '@/pages/exception/500'
import PageView from '@/layouts/PageView'
import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'
import BasicForm from '@/pages/form/BasicForm'
import StepForm from '@/pages/form/stepForm/StepForm'
import AdvancedForm from '@/pages/form/advancedForm/AdvancedForm'
import Success from '@/pages/result/Success'
import Error from '@/pages/result/Error'
import QueryList from '@/pages/list/QueryList'
import StandardList from '@/pages/list/StandardList'
import CardList from '@/pages/list/CardList'
import SearchLayout from '@/pages/list/search/SearchLayout'
import ArticleList from '@/pages/list/search/ArticleList'
import ApplicationList from '@/pages/list/search/ApplicationList'
import ProjectList from '@/pages/list/search/ProjectList'
import WorkPlace from '@/pages/dashboard/WorkPlace'
import Login from '@/pages/login/Login'
import BasicDetail from '@/pages/detail/BasicDetail'
import AdvancedDetail from '@/pages/detail/AdvancedDetail'
import TaskCard from '@/pages/components/TaskCard'
import ColorBox from '@/pages/components/Palette'

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
      name: '首页',
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
          component: RouteView,
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
        },
        {
          path: '/pages',
          redirect: '/pages/taskcard',
          name: '小组件',
          icon: 'appstore-o',
          component: PageView,
          children: [
            {
              path: '/pages/taskcard',
              name: '任务卡片',
              icon: 'none',
              component: TaskCard
            },
            {
              path: '/pages/palette',
              name: '颜色复选框',
              icon: 'none',
              component: ColorBox
            }
          ]
        }
      ]
    }
  ]
})
