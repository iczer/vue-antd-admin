import Mock from 'mockjs'
import '@/mock/extend'
import {parseUrlParams} from '@/utils/request'

const current = new Date().getTime()

const goodsList = Mock.mock({
  'list|100': [{
    'id|+1': 0,
    'name': '@GOODS',
    'orderId': `${current}-@integer(1,100)`,
    'status|1-4': 1,
    'send': '@BOOLEAN',
    'sendTime': '@DATETIME',
    'orderDate': '@DATE',
    'auditTime': '@TIME'
  }]
})

Mock.mock(RegExp(`${process.env.VUE_APP_API_BASE_URL}/goods` + '.*'),'get', ({url}) => {
  const params = parseUrlParams(decodeURI(url))
  let {page, pageSize} = params
  page = eval(page) - 1 || 0
  pageSize = eval(pageSize) || 10
  delete params.page
  delete params.pageSize
  let result = goodsList.list.filter(item => {
    for (let [key, value] of Object.entries(params)) {
      if (item[key] != value) {
        return false
      }
    }
    return true
  })
  const total = result.length
  if ((page) * pageSize > total) {
    result = []
  } else {
    result = result.slice(page * pageSize, (page + 1) * pageSize)
  }
  return {
    code: 0,
    message: 'success',
    data: {
      page: page + 1,
      pageSize,
      total,
      list: result
    }
  }
})