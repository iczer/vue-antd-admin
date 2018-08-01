import Mock from 'mockjs'
import '@/mock/user/current'
import '@/mock/project'

// 设置全局延时
Mock.setup({
  timeout: '300-600'
})
