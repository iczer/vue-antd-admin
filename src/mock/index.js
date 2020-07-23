import Mock from 'mockjs'
import '@/mock/user/login'

// 设置全局延时
Mock.setup({
  timeout: '300-600'
})
