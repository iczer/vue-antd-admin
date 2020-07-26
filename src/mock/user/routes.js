import Mock from 'mockjs'

Mock.mock('/routes', 'get', () => {
  let result = {}
  result.code = 0
  result.data = [{
    router: 'root',
    children: ['demo',
      {
        router: 'parent1',
        children: ['demo'],
      },
      {
        router: 'parent2',
        children: ['demo'],
      },
      {
        router: 'exception',
        children: ['exp404', 'exp403', 'exp500'],
      }
    ]
  }]
  return result
})
