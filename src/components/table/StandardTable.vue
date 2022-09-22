<template>
  <div class="standard-table">
    <div class="alert">
      <a-alert type="info" :show-icon="true" v-if="selectedRows">
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
      :expandedRowKeys="expandedRowKeys"
      :expandedRowRender="expandedRowRender"
      @change="onChange"
      :rowSelection="selectedRows ? {selectedRowKeys, onSelect, onSelectAll} : undefined"
    >
      <template slot-scope="text, record, index" :slot="slot" v-for="slot in Object.keys($scopedSlots).filter(key => key !== 'expandedRowRender') ">
        <slot :name="slot" v-bind="{text, record, index}"></slot>
      </template>
      <template :slot="slot" v-for="slot in Object.keys($slots)">
        <slot :name="slot"></slot>
      </template>
      <template slot-scope="record, index, indent, expanded" :slot="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''">
        <slot v-bind="{record, index, indent, expanded}" :name="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''"></slot>
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
    pagination: {
      type: [Object, Boolean],
      default: true
    },
    selectedRows: Array,
    expandedRowKeys: Array,
    expandedRowRender: Function
  },
  data () {
    return {
      needTotalList: []
    }
  },
  methods: {
    equals(record1, record2) {
      if (record1 === record2) {
        return true
      }
      const {rowKey} = this
      if (rowKey && typeof rowKey === 'string') {
        return record1[rowKey] === record2[rowKey]
      } else if (rowKey && typeof rowKey === 'function') {
        return rowKey(record1) === rowKey(record2)
      }
      return false
    },
    contains(arr, item) {
      if (!arr || arr.length === 0) {
        return false
      }
      const {equals} = this
      for (let i = 0; i < arr.length; i++) {
        if (equals(arr[i], item)) {
          return true
        }
      }
      return false
    },
    onSelectAll(selected, rows) {
      const {getKey, contains} = this
      const unselected = this.dataSource.filter(item => !contains(rows, item, this.rowKey))
      const _selectedRows = this.selectedRows.filter(item => !contains(unselected, item, this.rowKey))
      const set = {}
      _selectedRows.forEach(item => set[getKey(item)] = item)
      rows.forEach(item => set[getKey(item)] = item)
      const _rows = Object.values(set)
      this.$emit('update:selectedRows', _rows)
      this.$emit('selectedRowChange', _rows.map(item => getKey(item)), _rows)
    },
    getKey(record) {
      const {rowKey} = this
      if (!rowKey || !record) {
        return undefined
      }
      if (typeof rowKey === 'string') {
        return record[rowKey]
      } else {
        return rowKey(record)
      }
    },
    onSelect(record, selected) {
      const {equals, selectedRows, getKey} = this
      const _selectedRows = selected ? [...selectedRows, record] : selectedRows.filter(row => !equals(row, record))
      this.$emit('update:selectedRows', _selectedRows)
      this.$emit('selectedRowChange', _selectedRows.map(item => getKey(item)), _selectedRows)
    },
    initTotalList (columns) {
      return columns.filter(item => item.needTotal)
        .map(item => {
          return {
            ...item,
            total: 0
          }
        })
    },
    onClear() {
      this.$emit('update:selectedRows', [])
      this.$emit('selectedRowChange', [], [])
      this.$emit('clear')
    },
    onChange(pagination, filters, sorter, {currentDataSource}) {
      this.$emit('change', pagination, filters, sorter, {currentDataSource})
    }
  },
  created () {
    this.needTotalList = this.initTotalList(this.columns)
  },
  watch: {
    selectedRows (selectedRows) {
      this.needTotalList = this.needTotalList.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            let v
            try{
              v = val[item.dataIndex] ? val[item.dataIndex] : eval(`val.${item.dataIndex}`);
            }catch(_){
              v = val[item.dataIndex];
            }
            v = !isNaN(parseFloat(v)) ? parseFloat(v) : 0;
            return sum + v
          }, 0)
        }
      })
    }
  },
  computed: {
    selectedRowKeys() {
      return this.selectedRows.map(record => this.getKey(record))
    },
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
