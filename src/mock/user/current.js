import Mock from 'mockjs'
import '@/mock/extend'

const userDB = Mock.mock({
  'list|2-10': [
    {
      name: '@ADMIN',
      avatar: '@AVATAR',
      address: '@CITY',
      welcome: '@WELCOME',
      timefix: '@TIMEFIX',
      position: '@position'
    }
  ]
}).list

Mock.mock('/user/current', 'get', () => {
  return userDB[0]
})
