<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="规则编号"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="使用状态"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-select placeholder="请选择">
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="调用次数"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input-number style="width: 100%" placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
          <a-row v-if="advanced">
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="更新日期"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-date-picker style="width: 100%" placeholder="请输入更新日期" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="使用状态"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-select placeholder="请选择">
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="描述"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
      </a-form>
    </div>
    <div>
      <standard-table
        :columns="columns"
      />
    </div>
  </a-card>
</template>

<script>
import ARow from 'vue-antd-ui/es/grid/Row'
import ACol from 'vue-antd-ui/es/grid/Col'
import AForm from 'vue-antd-ui/es/form/Form'
import AFormItem from 'vue-antd-ui/es/form/FormItem'
import AInput from 'vue-antd-ui/es/input/Input'
import ACard from 'vue-antd-ui/es/card/Card'
import ASelect from 'vue-antd-ui/es/select/index'
import AInputNumber from 'vue-antd-ui/es/input-number/index'
import ADatePicker from 'vue-antd-ui/es/date-picker/index'
import AButton from 'vue-antd-ui/es/button/button'
import AIcon from 'vue-antd-ui/es/icon/icon'
import StandardTable from '../table/StandardTable'

const ASelectOption = ASelect.Option

const columns = [
  {
    title: '规则编号',
    dataIndex: 'no'
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true
  },
  {
    title: '操作',
    key: 'action'
  }
]

export default {
  name: 'QueryList',
  components: {
    StandardTable,
    AIcon,
    AButton,
    ADatePicker,
    AInputNumber,
    ASelectOption,
    ASelect,
    ACard,
    AInput,
    AFormItem,
    AForm,
    ACol,
    ARow},
  data () {
    return {
      advanced: true,
      columns: columns
    }
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
