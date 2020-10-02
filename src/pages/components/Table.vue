<template>
  <div>
    <advance-table
      :columns="columns"
      :data-source="dataSource"
      title="高级表格-Beta"
      :loading="loading"
      rowKey="id"
      @search="onSearch"
      @refresh="onRefresh"
      @reset="onReset"
    >
      <template slot="statusTitle">
        状态<a-icon style="margin: 0 4px" type="info-circle" />
      </template>
      <template slot="send" slot-scope="{text}">
        {{text ? '是' : '否'}}
      </template>
      <template slot="status" slot-scope="{text}">
        {{text | statusStr}}
      </template>
    </advance-table>
  </div>
</template>

<script>
  import AdvanceTable from '@/components/table/advance/AdvanceTable'
  import moment from 'moment'

  const goods = ['运动鞋', 'T恤', '长裤', '短裤']
  const dataSource = []
  const current = new Date().getTime()
  for (let i = 0; i < 100; i++) {
    dataSource.push({
      id: i,
      name: goods[Math.floor((Math.random() * 4))],
      orderId: `${new Date().getTime()}-${Math.floor(Math.random() * 10)}`,
      status: Math.floor((Math.random() * 4) + 1),
      send: (i % 2) === 1,
      sendTime: moment(current -  Math.floor((Math.random() * 8000000))).format('YYYY-MM-DD HH:mm:ss'),
      orderDate: moment(current -  Math.floor((Math.random() * 800000000))).format('YYYY-MM-DD'),
      auditTime: moment(current -  Math.floor((Math.random() * 8000000))).format('HH:mm:ss'),
    })
  }
  export default {
    name: 'Table',
    components: {AdvanceTable},
    filters: {
      statusStr(val) {
        switch (val) {
          case 1: return '已下单'
          case 2: return '已付款'
          case 3: return '已审核'
          case 4: return '已发货'
        }
      }
    },
    data() {
      return {
        loading: false,
        columns: [
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
                {title: '已发货', value: 4}
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
            dataType: 'date'
          },
          {
            title: '审核时间',
            searchAble: true,
            dataIndex: 'auditTime',
            dataType: 'time',
          },
        ],
        dataSource: dataSource
      }
    },
    methods: {
      onSearch(conditions) {
        this.loading = true
        this.searchGoods(conditions).then(result => {
          this.dataSource = result
          this.loading = false
        })
      },
      onRefresh(conditions) {
        this.loading = true
        this.searchGoods(conditions).then(result => {
          this.dataSource = result
          this.loading = false
        })
      },
      onReset(conditions) {
        this.loading = true
        this.searchGoods(conditions).then(result => {
          this.dataSource = result
          this.loading = false
        })
      },
      async searchGoods(conditions) {
        const promise = new Promise((resolve, reject) => {
          try {
            const result = dataSource.filter(item => {
              for (let key of Object.keys(conditions)) {
                if (key === 'sendTime') {
                   if (conditions[key].format('YYYY-MM-DD HH:mm:ss') !== item[key]) return false
                } else if (key === 'orderDate') {
                  if (conditions[key].format('YYYY-MM-DD') !== item[key]) return false
                } else if (key === 'auditTime') {
                  if (conditions[key].format('HH:mm:ss') !== item[key]) return false
                } else if (item[key] !== conditions[key]) {
                  return false
                }
              }
              return true
            })
            setTimeout(() => {
              resolve(result)
            }, 300)
          } catch (e) {
            reject(e)
          }
        })
        return promise
      }
    }
  }
</script>

<style scoped>

</style>