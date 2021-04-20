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

const columnsConfig = [
  {
    title: '商品名称',
    dataIndex: 'name',
    searchAble: true
  },
  {
    title: '订单号',
    dataIndex: 'orderId'
  },
  {
    searchAble: true,
    dataIndex: 'status',
    dataType: 'select',
    slots: {title: 'statusTitle'},
    scopedSlots: {customRender: 'status'},
    search: {
      selectOptions: [
        {title: '已下单', value: 1},
        {title: '已付款', value: 2},
        {title: '已审核', value: 3},
        // {title: '已发货', value: 4}
      ]
    }
  },
  {
    title: '发货',
    searchAble: true,
    dataIndex: 'send',
    dataType: 'boolean',
    scopedSlots: {customRender: 'send'}
  },
  {
    title: '发货时间',
    dataIndex: 'sendTime',
    dataType: 'datetime'
  },
  {
    title: '下单日期',
    searchAble: true,
    dataIndex: 'orderDate',
    dataType: 'date',
    visible: false
  },
  {
    title: '审核时间',
    dataIndex: 'auditTime',
    dataType: 'time',
  },
]

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/columns`, 'get', () => {
  return columnsConfig
})