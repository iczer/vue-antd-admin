<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item :wrapperCol="{span: 15, offset: 9}">
        success
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="doOnceAgin">再转一笔</a-button>
        <a-button style="margin-left: 8px">查看账单</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import AForm from 'vue-antd-ui/es/form/Form'
import AFormItem from 'vue-antd-ui/es/form/FormItem'
import AButton from 'vue-antd-ui/es/button/button'
export default {
  name: 'Step3',
  components: {AButton, AFormItem, AForm},
  methods: {
    doOnceAgin () {
      this.$emit('finish')
    }
  }
}
</script>

<style scoped>

</style>
