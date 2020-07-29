import Mock from 'mockjs'

Mock.mock('/routes', 'get', () => {
  let result = {}
  result.code = 0
  result.data = [{
    router: 'root',
    children: [
      {
        router: 'dashboard',
        children: ['workplace', 'analysis'],
      },
      {
        router: 'form',
        children: ['basicForm', 'stepForm', 'advanceForm']
      },
      {
        router: 'basicForm',
        name: '验权表单',
        icon: 'file-excel',
        authority: 'form'
      }
    ]
  }]
  return result
})
