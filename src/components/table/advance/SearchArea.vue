<template>
  <div class="search-area" ref="root">
    <div class="select-root" ref="selectRoot"></div>
    <div class="search-item" :key="index" v-for="(col, index) in searchCols">
      <div v-if="col.dataType === 'boolean'" class="title active">
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-switch @change="onSwitchChange" class="switch" v-model="col.search.value" size="small" checked-children="是" un-checked-children="否" />
      </div>
      <div v-else-if="col.dataType === 'time'" class="title active">
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-time-picker v-model="col.search.value" placeholder="选择时间" @change="(time, timeStr) => onCalendarChange(time, timeStr, col)" @openChange="open => onCalendarOpenChange(open, col)" class="time-picker" size="small" :get-popup-container="() => $refs.root"/>
      </div>
      <div v-else-if="col.dataType === 'date'" class="title active">
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-date-picker v-model="col.search.value" @change="onDateChange(col)" class="date-picker" size="small" :getCalendarContainer="() => $refs.root"/>
      </div>
      <div v-else-if="col.dataType === 'datetime'" class="title datetime active">
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-date-picker v-model="col.search.value" @change="(date, dateStr) => onCalendarChange(date, dateStr, col)" @openChange="open => onCalendarOpenChange(open, col)" show-time class="datetime-picker" size="small" :get-clalendar-container="() => $refs.root"/>
      </div>
      <div v-else-if="col.dataType === 'select'" class="title active" >
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-select :allowClear="true" :options="col.search.selectOptions" v-model="col.search.value" placeholder="请选择..." @change="onSelectChange(col)" class="select" slot="content" size="small" :get-popup-container="() => $refs.selectRoot">
        </a-select>
      </div>
      <a-popover v-else @visibleChange="onVisibleChange(col, index)" v-model="col.search.visible" placement="bottom" :trigger="['click']" :get-popup-container="() => $refs.root">
        <div :class="['title', {active: col.search.value}]">
          <template v-if="col.title">
            {{col.title}}
          </template>
          <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
          <div class="value " v-if="col.search.value">:&nbsp;&nbsp;{{col | searchValue}}</div>
          <a-icon class="icon-down" type="down"/>
        </div>
        <div class="operations" slot="content">
          <a-button @click="onCancel(col)" class="btn" size="small" type="link">取消</a-button>
          <a-button @click="onConfirm(col)" class="btn" size="small" type="primary">确认</a-button>
        </div>
        <div class="search-overlay" slot="title">
          <a-input :id="`${searchIdPrefix}${index}`" :allow-clear="true" @keyup.esc="onCancel(col)" @keyup.enter="onConfirm(col)" v-model="col.search.value" size="default" />
        </div>
      </a-popover>
    </div>
  </div>
</template>

<script>
  import fastEqual from 'fast-deep-equal'
  import moment from 'moment'

  export default {
    name: 'SearchArea',
    props: ['columns'],
    inject: ['table'],
    created() {
      this.columns.forEach(item => {
        this.$set(item, 'search', {...item.search, visible: false, value: item.dataType === 'boolean' ? false : undefined, format: this.getCalendarFormat(item)})
      })
    },
    filters: {
      searchValue(col) {
        if (col.dataType === 'time' && col.search.value) {
          return col.search.value.format('HH:mm:ss')
        }
        return col.search.value
      }
    },
    watch: {
      searchCols(newVal, oldVal) {
        if (newVal.length != oldVal.length) {
          const newConditions = this.getConditions(newVal)
          if (!fastEqual(newConditions, this.conditions)) {
            this.conditions = newConditions
            this.$emit('change', this.conditions)
          }
        }
      }
    },
    data() {
      return {
        conditions: []
      }
    },
    computed: {
      searchCols() {
        return this.columns.filter(item => item.searchAble)
      },
      searchIdPrefix() {
        return this.table.id + '-ipt-'
      }
    },
    methods: {
      onCancel(col) {
        col.search.value = col.search.backup
        col.search.visible = false
      },
      onConfirm(col) {
        col.search.backup = col.search.value
        col.search.visible = false
        const conditions = this.getConditions(this.searchCols)
        if (!fastEqual(conditions, this.conditions)) {
          this.conditions = conditions
          this.$emit('change', this.conditions)
        }
      },
      onSwitchChange() {
        this.conditions = this.getConditions(this.searchCols)
        this.$emit('change', this.conditions)
      },
      onSelectChange() {
        this.conditions = this.getConditions(this.searchCols)
        this.$emit('change', this.conditions)
      },
      onCalendarOpenChange(open, col) {
        col.search.visible = open
        const {momentEqual, getConditions} = this
        const {value, backup, format} = col.search
        if (!open && !momentEqual(value, backup, format)) {
          col.search.backup = moment(value)
          this.conditions = getConditions(this.searchCols)
          this.$emit('change', this.conditions)
        }
      },
      onCalendarChange(date, dateStr, col) {
        const {momentEqual, getConditions} = this
        const {value, backup, format} = col.search
        if (!col.search.visible && !momentEqual(value, backup, format)) {
          col.search.backup = moment(value)
          this.conditions = getConditions(this.searchCols)
          this.$emit('change', this.conditions)
        }
      },
      onDateChange(col) {
        const {momentEqual, getConditions} = this
        const {value, backup} = col.search
        if (!momentEqual(value, backup, 'YYYY-MM-DD')) {
          col.search.backup = moment(value)
          this.conditions = getConditions(this.searchCols)
          this.$emit('change', this.conditions)
        }
      },
      getCalendarFormat(col) {
        const dataType = col.dataType
        switch(dataType) {
          case 'time': return 'HH:mm:ss'
          case 'date': return 'YYYY-MM-DD'
          case 'datetime': return 'YYYY-MM-DD HH:mm:ss'
          default: return col.search && col.search.format
        }
      },
      getConditions(columns) {
        const conditions = {}
        columns.filter(item => item.search.value !== undefined && item.search.value !== '' && item.search.value !== null)
          .forEach(col => {
            conditions[col.dataIndex] = col.search.value
          })
        return conditions
      },
      onVisibleChange(col, index) {
        if (!col.search.visible) {
          col.search.value = col.search.backup
        } else {
          let input = document.getElementById(`${this.searchIdPrefix}${index}`)
          if (input) {
            setTimeout(() => {input.focus()}, 0)
          } else {
            this.$nextTick(() => {
              input = document.getElementById(`${this.searchIdPrefix}${index}`)
              input.focus()
            })
          }
        }
      },
      momentEqual(target, source, format) {
        if (target === source) {
          return true
        } else if (target && source && target.format(format) === source.format(format)) {
          return true
        }
        return false
      }
    }
  }
</script>

<style scoped lang="less">
.search-area{
  .select-root{
    text-align: left;
  }
  margin: -4px 0;
  .search-item{
    margin: 4px 4px;
    display: inline-block;
    .title{
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 4px;
      user-select: none;
      display: inline-flex;
      align-items: center;
      .switch{
        margin-left: 4px;
      }
      .time-picker{
        margin-left: 4px;
        width: 96px;
      }
      .date-picker{
        margin-left: 4px;
        width: 120px;
      }
      .datetime-picker{
        margin-left: 4px;
        width: 195px;
      }
      .value{
        display: inline-block;
        overflow: hidden;
        flex:1;
        max-width: 144px;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
      }
      &.active{
        background-color: @layout-bg-color;
      }
    }
    .icon-down{
      margin-left: 4px;
      font-size: 12px;
    }
  }
  .search-overlay{
    padding: 8px 0px;
    text-align: center;
  }
  .select{
    margin-left: 4px;
    max-width: 144px;
    min-width: 96px;
    text-align: left;
  }
  .operations{
    display: flex;
    justify-content: space-between;
    .btn{
    }
  }
}
</style>