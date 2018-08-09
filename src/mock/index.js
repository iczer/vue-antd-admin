import Mock from 'mockjs'
import '@/mock/user/current'
import '@/mock/project'
import '@/mock/user/login'
import '@/mock/workplace'

// 设置全局延时
Mock.setup({
  timeout: '300-600'
})
