import Mock from 'mockjs'

Mock.mock('/routes', 'get', () => {
  let result = {}
  result.code = 0
  result.data = [{
    router: 'root',
    children: ['demo',
      {
        router: 'parent1',
        children: [{
          router: 'demo',
          name: 'demo1',
          authority: {
            permission: 'demo',
            role: 'admin'
          }
        }],
      },
      {
        router: 'parent2',
        children: [{
          router: 'demo',
          name: 'demo2'
        }],
      },
      {
        router: 'exception',
        children: ['exp404', 'exp403', 'exp500'],
      },
      {
        router: 'demo',
        icon: 'file-ppt',
        path: 'auth/demo',
        name: '验权页面',
        authority: {
          permission: 'form',
          role: 'manager'
        }
      }
    ]
  }]
  return result
})
