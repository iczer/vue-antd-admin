<template>
  <div class="api">
    <div class="introduce">
      <h2 class="title">说明</h2>
      <p class="content">
        AdvanceTable 是基于 Ant Design Vue Table 组件封装，支持其所有 API。<br/>
        主要添加了<em>列设置</em>及<em>搜索控件配置</em>的功能，可用于一些需要动态配置表格展示、动态配置搜索条件的场景。<br/>
        使用方式 与 antd table 基本无异。添加了部分API，如下：
      </p>
    </div>
    <api-table :api-source="apiSource" />
    <api-table type="event" title="事件" :api-source="events" />
    <api-table title="Column" :api-source="columnApi" />
    <api-table title="Search" :api-source="searchApi" />
  </div>
</template>

<script>
  import ApiTable from '@/components/table/api/ApiTable'
  export default {
    name: 'Api',
    components: {ApiTable},
    data() {
      return {
        apiSource: [
          {
            key: 0,
            param: '<a href="https://www.antdv.com/components/table-cn/#API" target="_blank">Ant Design Vue Table API</a>',
            desc: '支持 Ant Design Vue Table 组件 所有 api',
            type: '--',
            default: '--',
          },
          {
            key: 1,
            param: 'title',
            desc: '表格标题',
            type: 'string | slot',
            default: '\'高级表格\''
          },
          {
            key: 2,
            param: 'formatConditions',
            desc: `是否格式化搜索条件的值，格式化规则参考 <a>Search 配置</a>。
                   <br/>false：取搜索输入控件的原值 <br/>true：取搜索输入控件格式化后的值`,
            type: 'boolean',
            default: 'false',
          },
          {
            key: 3,
            param: 'columns',
            desc: `表格列配置，参考 <a>Column 配置</a>`,
            type: 'array',
            default: '--',
          }
        ],
        events: [
          {
            key: 0,
            param: '<a href="https://www.antdv.com/components/table-cn/#API" target="_blank">Ant Design Vue Table Events API</a>',
            desc: '支持 Ant Design Vue Table 所有事件',
            callback: '--',
          },
          {
            key: 1,
            param: 'search',
            desc: '搜索条件变化时触发',
            callback: 'Function(conditions, searchOptions: [{field, value, format}])',
          },
          {
            key: 2,
            param: 'refresh',
            desc: '表头刷新图标点击时触发',
            callback: 'Function(conditions, searchOptions: [{field, value, format}])',
          },
          {
            key: 3,
            param: 'reset',
            desc: '列配置重置按钮点击时触发',
            callback: 'Function(conditions, searchOptions: [{field, value, format}])',
          },
        ],
        columnApi: [
          {
            key: 0,
            param: '<a href="https://www.antdv.com/components/table-cn/#API" target="_blank">Ant Design Vue Table Column API</a>',
            desc: '支持 Ant Design Vue Table 组件 Column 配置所有 api',
            type: '--',
            default: '--'
          },
          {
            key: 1,
            param: 'searchAble',
            desc: '是否启用列搜索',
            type: 'boolean',
            default: 'false'
          },
          {
            key: 2,
            param: 'dataType',
            desc: `数据类型，该配置将决定列搜索输入控件的类型，与列搜索输入控件对应关系如下：<br/>
                   string: 输入框组件<br/>
                   boolean: 开关组件<br/>
                   select: 下拉输入框组件<br/>
                   date: 日期选择器<br/>
                   time: 时间选择器<br/>
                   datetime: 带时间选择器的日期选择器`,
            type: `'string' | 'boolean' | 'select' | 'date' | 'time' | 'datetime'`,
            default: `'string'`
          },
          {
            key: 3,
            param: 'search',
            desc: '列搜索配置，参考 <a>Search 配置</a>',
            type: 'object',
            default: '--'
          },
        ],
        searchApi: [
          {
            key: 0,
            param: 'format',
            desc: `列搜索输入控件值的格式化配置。<br/>如果输入控件支持格式化，则可设置该值为字符串，如日期输入组件，可设为为 'YYYY-MM-DD'。
                   <br/>不支持格式化的输入控件，可设置为一个接收控件的输入值作为参数的函数，如 (value) => {return \`prefix\${value}\`}。`,
            type: 'string | Function(value)',
            default: '取输入控件默认的格式化配置'
          },
          {
            key: 1,
            param: 'selectOptions',
            desc: `select 数据类型的下拉输入组件的选项配置，可参考 <a href="https://www.antdv.com/components/select-cn/#API" target="_blank">Ant Design Vue Select Option props Api</a>`,
            type: 'array',
            default: '--'
          }
        ],
      }
    }
  }
</script>

<style scoped lang="less">
.api{
  .introduce{
    padding: 16px;
    .content{
      em{
        margin: 0 4px;
        color: @primary-color;
      }
    }
  }
}
</style>