import Mock from 'mockjs'
import '@/mock/extend'

Mock.mock('/login', 'post', ({body}) => {
  let result = {}
  const {name, password} = JSON.parse(body)

  if (name !== 'admin' || password !== '888888') {
    result.code = -1
    result.message = '账户名或密码错误（admin/888888）'
  } else {
    result.code = 0
    result.message = Mock.mock('@TIMEFIX') + '，欢迎回来'
  }
  return result
})
