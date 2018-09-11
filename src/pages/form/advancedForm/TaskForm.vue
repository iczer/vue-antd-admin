<template>
  <a-form @submit="handleSubmit" :autoFormCreate="(form) => this.form = form" class="form">
    <a-row class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="任务名"
          fieldDecoratorId="task.name"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入任务名称', whitespace: true}]}"
        >
          <a-input placeholder="请输入任务名称" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          label="任务描述"
          fieldDecoratorId="task.description"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入任务描述', whitespace: true}]}"
        >
          <a-input placeholder="请输入任务描述"/>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 8, offset: 2}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="执行人"
          fieldDecoratorId="task.executor"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择执行人'}]}"
        >
          <a-select placeholder="请选择执行人">
            <a-select-option value="黄丽丽">黄丽丽</a-select-option>
            <a-select-option value="李大刀">李大刀</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="责任人"
          fieldDecoratorId="task.manager"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择责任人'}]}"
        >
          <a-select placeholder="请选择责任人">
            <a-select-option value="王伟">王伟</a-select-option>
            <a-select-option value="李红军">李红军</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          label="提醒时间"
          fieldDecoratorId="task.time"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择提醒时间'}]}"
        >
          <a-time-picker style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 8, offset: 2}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="任务类型"
          fieldDecoratorId="task.type"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择任务类型'}]}"
        >
          <a-select placeholder="请选择任务类型">
            <a-select-option value="定时执行">定时执行</a-select-option>
            <a-select-option value="周期执行">周期执行</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit" >Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import AForm from 'ant-design-vue/es/form/Form'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import ACol from 'ant-design-vue/es/grid/Col'
import ARow from 'ant-design-vue/es/grid/Row'
import AInput from 'ant-design-vue/es/input/Input'
import ASelect from 'ant-design-vue/es/select/index'
import AButton from 'ant-design-vue/es/button/button'
import ATimePicker from 'ant-design-vue/es/time-picker/index'

const ASelectOption = ASelect.Option

export default {
  name: 'TaskForm',
  props: ['showSubmit'],
  components: {ATimePicker, AButton, ASelectOption, ASelect, AInput, ARow, ACol, AFormItem, AForm},
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .form{
    .form-row{
      margin: 0 -8px
    }
    .ant-col-md-12,
    .ant-col-sm-24,
    .ant-col-lg-6,
    .ant-col-lg-8,
    .ant-col-lg-10,
    .ant-col-xl-8,
    .ant-col-xl-6{
      padding: 0 8px
    }
  }
</style>
