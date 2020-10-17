import Mock from 'mockjs'
import '@/mock/user/current'
import '@/mock/project'
import '@/mock/user/login'
import '@/mock/workplace'
import '@/mock/user/routes'
import '@/mock/goods'

// 设置全局延时
Mock.setup({
  timeout: '200-400'
})
