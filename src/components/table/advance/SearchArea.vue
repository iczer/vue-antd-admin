<template>
  <div class="search-area" ref="root">
    <div class="select-root" ref="selectRoot"></div>
    <div class="search-item" :key="index" v-for="(col, index) in searchCols">
      <div v-if="col.dataType === 'boolean'" :class="['title', {active: col.search.value !== undefined}]">
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-switch @change="onSwitchChange(col)" class="switch" v-model="col.search.value" size="small"
                  :checked-children="(col.search.switchOptions && col.search.switchOptions.checkedText) || '是'"
                  :un-checked-children="(col.search.switchOptions && col.search.switchOptions.uncheckedText) || '否'"
        />
        <a-icon v-if="col.search.value !== undefined" class="close" @click="e => onCloseClick(e, col)" type="close-circle" theme="filled" />
      </div>
      <div v-else-if="col.dataType === 'time'" :class="['title', {active: col.search.value}]">
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-time-picker :format="col.search.format" v-model="col.search.value" placeholder="选择时间" @change="(time, timeStr) => onCalendarChange(time, timeStr, col)" @openChange="open => onCalendarOpenChange(open, col)" class="time-picker" size="small" :get-popup-container="() => $refs.root"/>
      </div>
      <div v-else-if="col.dataType === 'date'" :class="['title', {active: col.search.value}]">
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-date-picker :format="col.search.format" v-model="col.search.value" @change="onDateChange(col)" class="date-picker" size="small" :getCalendarContainer="() => $refs.root"/>
      </div>
      <div v-else-if="col.dataType === 'datetime'" class="title datetime active">
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-date-picker :format="col.search.format" v-model="col.search.value" @change="(date, dateStr) => onCalendarChange(date, dateStr, col)" @openChange="open => onCalendarOpenChange(open, col)" class="datetime-picker" size="small" show-time :getCalendarContainer="() => $refs.root"/>
      </div>
      <div v-else-if="col.dataType === 'select'" :class="['title', {active: col.search.value !== undefined}]">
        <template v-if="col.title">
          {{col.title}}:
        </template>
        <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
        <a-select :allowClear="true" :options="col.search.selectOptions" v-model="col.search.value" placeholder="请选择..." @change="onSelectChange(col)" class="select" slot="content" size="small" :get-popup-container="() => $refs.selectRoot">
        </a-select>
      </div>
      <div v-else :class="['title', {active: col.search.value}]">
        <a-popover @visibleChange="onVisibleChange(col, index)" v-model="col.search.visible" placement="bottom" :trigger="['click']" :get-popup-container="() => $refs.root">
          <template v-if="col.title">
            {{col.title}}
          </template>
          <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title"></slot>
          <div class="value " v-if="col.search.value">:&nbsp;&nbsp;{{col.search.format && typeof col.search.format === 'function' ? col.search.format(col.search.value) : col.search.value}}</div>
          <a-icon v-if="!col.search.value" class="icon-down" type="down"/>
          <div class="operations" slot="content">
            <a-button @click="onCancel(col)" class="btn" size="small" type="link">取消</a-button>
            <a-button @click="onConfirm(col)" class="btn" size="small" type="primary">确认</a-button>
          </div>
          <div class="search-overlay" slot="title">
            <a-input :id="`${searchIdPrefix}${index}`" :allow-clear="true" @keyup.esc="onCancel(col)" @keyup.enter="onConfirm(col)" v-model="col.search.value" size="small" />
          </div>
        </a-popover>
        <a-icon v-if="col.search.value" @click="e => onCloseClick(e, col)" class="close" type="close-circle" theme="filled"/>
      </div>
    </div>
  </div>
</template>

<script>
  import fastEqual from 'fast-deep-equal'
  import moment from 'moment'

  export default {
    name: 'SearchArea',
    props: ['columns', 'formatConditions'],
    inject: ['table'],
    created() {
      this.formatColumns(this.columns)
    },
    watch: {
      columns(newVal, oldVal) {
        if (newVal != oldVal) {
          this.formatColumns(newVal)
        }
      },
      searchCols(newVal, oldVal) {
        if (newVal.length != oldVal.length) {
          const newConditions = this.getConditions(newVal)
          const newSearchOptions = this.getSearchOptions(newVal)
          if (!fastEqual(newConditions, this.conditions)) {
            this.conditions = newConditions
            this.searchOptions = newSearchOptions
            this.$emit('change', this.conditions, this.searchOptions)
          }
        }
      }
    },
    data() {
      return {
        conditions: {},
        searchOptions: []
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
      onCloseClick(e, col) {
        e.preventDefault()
        e.stopPropagation()
        col.search.value = undefined
        const {backup, value} = col.search
        if (backup !== value) {
          this.backupAndEmitChange(col)
        }
      },
      onCancel(col) {
        col.search.value = col.search.backup
        col.search.visible = false
      },
      onConfirm(col) {
        const {backup, value} = col.search
        col.search.visible = false
        if (backup !== value) {
          this.backupAndEmitChange(col)
        }
      },
      onSwitchChange(col) {
        const {backup, value} = col.search
        if (backup !== value) {
          this.backupAndEmitChange(col)
        }
      },
      onSelectChange(col) {
        this.backupAndEmitChange(col)
      },
      onCalendarOpenChange(open, col) {
        col.search.visible = open
        const {momentEqual, backupAndEmitChange} = this
        const {value, backup, format} = col.search
        if (!open && !momentEqual(value, backup, format)) {
          backupAndEmitChange(col, moment(value))
        }
      },
      onCalendarChange(date, dateStr, col) {
        const {momentEqual, backupAndEmitChange} = this
        const {value, backup, format} = col.search
        if (!col.search.visible && !momentEqual(value, backup, format)) {
          backupAndEmitChange(col, moment(value))
        }
      },
      onDateChange(col) {
        const {momentEqual, backupAndEmitChange} = this
        const {value, backup, format} = col.search
        if (!momentEqual(value, backup, format)) {
          backupAndEmitChange(col, moment(value))
        }
      },
      getFormat(col) {
        if (col.search && col.search.format) {
          return col.search.format
        }
        const dataType = col.dataType
        switch(dataType) {
          case 'time': return 'HH:mm:ss'
          case 'date': return 'YYYY-MM-DD'
          case 'datetime': return 'YYYY-MM-DD HH:mm:ss'
          default: return undefined
        }
      },
      backupAndEmitChange(col, backValue = col.search.value) {
        const {getConditions, getSearchOptions} = this
        col.search.backup = backValue
        this.conditions = getConditions(this.searchCols)
        this.searchOptions = getSearchOptions(this.searchCols)
        this.$emit('change', this.conditions, this.searchOptions)
      },
      getConditions(columns) {
        const conditions = {}
        columns.filter(item => item.search.value !== undefined && item.search.value !== '' && item.search.value !== null)
          .forEach(col => {
            const {value, format} = col.search
            if (this.formatConditions && format) {
              if (typeof format === 'function') {
                conditions[col.dataIndex] = format(col.search.value)
              } else if (typeof format === 'string' && value.constructor.name === 'Moment') {
                conditions[col.dataIndex] = value.format(format)
              } else {
                conditions[col.dataIndex] = value
              }
            } else {
              conditions[col.dataIndex] = value
            }
          })
        return conditions
      },
      getSearchOptions(columns) {
        return columns.filter(item => item.search.value !== undefined && item.search.value !== '' && item.search.value !== null)
          .map(({dataIndex, search}) => ({field: dataIndex, value: search.value, format: search.format}))
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
      },
      formatColumns(columns) {
        columns.forEach(item => {
          this.$set(item, 'search', {...item.search, visible: false, value: undefined, format: this.getFormat(item)})
        })
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
      .close{
        color: @text-color-second;
        margin-left: 4px;
        font-size: 12px;
        vertical-align: middle;
        :hover{
          color: @text-color;
        }
      }
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
        vertical-align: middle;
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
      vertical-align: middle;
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
    margin: -6px 0;
    justify-content: space-between;
    .btn{
    }
  }
}
</style>
