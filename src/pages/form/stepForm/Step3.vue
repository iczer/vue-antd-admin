<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;">
      <result title="支付完成" :is-success="true" />
      <a-form-item :wrapperCol="{span: 16, offset: 8}">
        <a-button type="primary" @click="doOnceAgin">再转一笔</a-button>
        <a-button style="margin-left: 8px">查看账单</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import AForm from 'ant-design-vue/es/form/Form'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import AButton from 'ant-design-vue/es/button/button'
import Result from '../../../components/result/Result'
export default {
  name: 'Step3',
  components: {Result, AButton, AFormItem, AForm},
  methods: {
    doOnceAgin () {
      this.$emit('finish')
    }
  }
}
</script>

<style scoped>

</style>
