<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item :label="$t('name')">
          <a-input
            v-decorator="['task.name', {rules: [{ required: true, message: $ta('input|name'), whitespace: true}]}]"
            :placeholder="$ta('input|name')"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item :label="$t('describe')">
          <a-input
            v-decorator="['task.description', {rules: [{ required: true, message: $ta('input|describe'), whitespace: true}]}]"
            :placeholder="$ta('input|describe')"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 8, offset: 2}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          :label="$t('executor')"
        >
          <a-select
            :placeholder="$ta('select|executor')"
            v-decorator="['task.executor', {rules: [{ required: true, message: $ta('select|executor')}]}]"
          >
            <a-select-option value="黄丽丽">黄丽丽</a-select-option>
            <a-select-option value="李大刀">李大刀</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item :label="$t('duty')">
          <a-select
            :placeholder="$ta('select|duty')"
            v-decorator="['task.manager', {rules: [{ required: true, message: $ta('select|duty')}]}]"
          >
            <a-select-option value="王伟">王伟</a-select-option>
            <a-select-option value="李红军">李红军</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item :label="$t('time')">
          <a-time-picker
            v-decorator="['task.time', {rules: [{ required: true, message: $ta('select|time')}]}]"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 8, offset: 2}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item :label="$t('type')">
          <a-select
            :placeholder="$ta('select|type')"
            v-decorator="['task.type', {rules: [{ required: true, message: $ta('select|type')}]}]"
          >
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
export default {
  name: 'TaskForm',
  props: ['showSubmit'],
  i18n: require('./i18n-task'),
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
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
