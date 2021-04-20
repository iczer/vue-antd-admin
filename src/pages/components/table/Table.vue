<template>
  <div class="table">
    <advance-table
      :columns="columns"
      :data-source="dataSource"
      title="高级表格-Beta"
      :loading="loading"
      rowKey="id"
      @search="onSearch"
      @refresh="onRefresh"
      :format-conditions="true"
      @reset="onReset"
      :pagination="{
        current: page,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        showLessItems: true,
        showQuickJumper: true,
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，总计 ${total} 条`,
        onChange: onPageChange,
        onShowSizeChange: onSizeChange,
      }"
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
    <api />
  </div>
</template>

<script>
  import AdvanceTable from '@/components/table/advance/AdvanceTable'
  import {dataSource as ds} from '@/services'
  import Api from '@/pages/components/table/Api'

  export default {
    name: 'Table',
    components: {Api, AdvanceTable},
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
        page: 1,
        pageSize: 10,
        total: 0,
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
            scopedSlots: {customRender: 'send'},
            search: {
              switchOptions: {
                checkedText: '开',
                uncheckedText: '关'
              }
            }
          },
          {
            title: '审核时间',
            dataIndex: 'auditTime',
            dataType: 'time',
          }
        ],
        dataSource: [],
        conditions: {}
      }
    },
    created() {
      this.getGoodList()
      this.getColumns()
    },
    methods: {
      getGoodList() {
        this.loading = true
        const {page, pageSize, conditions} = this
        ds.goodsList({page, pageSize, ...conditions}).then(result => {
          const {list, page, pageSize, total} = result.data.data
          this.dataSource = list
          this.page = page
          this.total = total
          this.pageSize = pageSize
          this.loading = false
        })
      },
      getColumns() {
        ds.goodsColumns().then(res => {
          this.columns = res.data
        })
      },
      onSearch(conditions, searchOptions) {
        console.log(searchOptions)
        this.page = 1
        this.conditions = conditions
        this.getGoodList()
      },
      onSizeChange(current, size) {
        this.page = 1
        this.pageSize = size
        this.getGoodList()
      },
      onRefresh(conditions) {
        this.conditions = conditions
        this.getGoodList()
      },
      onReset(conditions) {
        this.conditions = conditions
        this.getGoodList()
      },
      onPageChange(page, pageSize) {
        this.page = page
        this.pageSize = pageSize
        this.getGoodList()
      }
    }
  }
</script>

<style scoped lang="less">
.table{
  background-color: @base-bg-color;
  padding: 24px;
}
</style>