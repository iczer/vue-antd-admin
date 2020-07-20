import Mock from 'mockjs'
import '@/mock/extend'

const welcome = Mock.mock({
  timeFix: '@TIMEFIX',
  message: '@WELCOME'
})

Mock.mock('/user/welcome', 'get', () => {
  return welcome
})
