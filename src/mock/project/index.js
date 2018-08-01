import Mock from 'mockjs'
import '@/mock/extend'

const projectArr = Mock.mock({
  'list|6': [
    {
      logo: '@LOGO',
      desc: '@SAYING'
    }
  ]
}).list

Mock.mock('/project', 'get', () => {
  return projectArr
})
