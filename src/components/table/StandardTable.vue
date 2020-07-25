<template>
  <div class="standard-table">
    <div class="alert">
      <a-alert type="info" :show-icon="true">
        <div class="message" slot="message">
          已选择&nbsp;<a>{{selectedRows.length}}</a>&nbsp;项 <a class="clear" @click="onClear">清空</a>
          <template  v-for="(item, index) in needTotalList" >
            <div v-if="item.needTotal" :key="index">
              {{item.title}}总计&nbsp;
              <a>{{item.customRender ? item.customRender(item.total) : item.total}}</a>
            </div>
          </template>
        </div>
      </a-alert>
    </div>
    <a-table
      :bordered="bordered"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="rowKey"
      :pagination="pagination"
      @change="onChange"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: updateSelect}"
    >
      <template slot-scope="text, record, index" :slot="slot" v-for="slot in scopedSlots">
        <slot :name="slot" v-bind="{text, record, index}"></slot>
      </template>
      <template :slot="slot" v-for="slot in slots">
        <slot :name="slot"></slot>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'StandardTable',
  props: {
    bordered: Boolean,
    loading: [Boolean, Object],
    columns: Array,
    dataSource: Array,
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    pagination: Object,
    selectedRows: Array
  },
  data () {
    return {
      needTotalList: [],
      scopedSlots: [],
      slots: []
    }
  },
  methods: {
    updateSelect (selectedRowKeys, selectedRows) {
      this.$emit('update:selectedRows', selectedRows)
      this.$emit('selectedRowChange', selectedRowKeys, selectedRows)
    },
    initTotalList (columns) {
      const totalList = columns.filter(item => item.needTotal)
        .map(item => {
          return {
            ...item,
            total: 0
          }
        })
      return totalList
    },
    getScopedSlots(columns) {
      let scopedSlots = columns.filter(item => item.scopedSlots).map(item => item.scopedSlots)
      scopedSlots = scopedSlots.flatMap(item => Object.values(item))
      return scopedSlots
    },
    getSlots(columns) {
      let slots = columns.filter(item => item.slots).map(item => item.slots)
      slots = slots.flatMap(item => Object.values(item))
      return slots
    },
    onClear() {
      this.updateSelect([], [])
      this.$emit('clear')
    },
    onChange(pagination, filters, sorter, {currentDataSource}) {
      this.$emit('change', pagination, filters, sorter, {currentDataSource})
    }
  },
  created () {
    this.scopedSlots = this.getScopedSlots(this.columns)
    this.slots = this.getSlots(this.columns)
    this.needTotalList = this.initTotalList(this.columns)
  },
  watch: {
    selectedRows (selectedRows) {
      this.needTotalList = this.needTotalList.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            return sum + val[item.dataIndex]
          }, 0)
        }
      })
    }
  },
  computed: {
    selectedRowKeys() {
      return this.selectedRows.map(record => {
        return (typeof this.rowKey === 'function') ? this.rowKey(record) : record[this.rowKey]
      })
    }
  }
}
</script>

<style scoped lang="less">
.standard-table{
  .alert{
    margin-bottom: 16px;
    .message{
      a{
        font-weight: 600;
      }
    }
    .clear{
      float: right;
    }
  }
}
</style>
