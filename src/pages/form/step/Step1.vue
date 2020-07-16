<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        :label="$t('payment')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
      >
        <a-select value="1" placeholder="ant-design@alipay.com">
          <a-select-option value="1">ant-design@alipay.com</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label="$t('collection')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
      >
        <a-input-group :compact="true" style="display: inline-block; vertical-align: middle">
          <a-select defaultValue="alipay" style="width: 100px">
            <a-select-option value="alipay">{{$t('alipay')}}</a-select-option>
            <a-select-option value="wexinpay">{{$t('wechat')}}</a-select-option>
          </a-select>
          <a-input :style="{width: 'calc(100% - 100px)'}" value="test@example.com"/>
        </a-input-group>
      </a-form-item>
      <a-form-item
        :label="$t('collectionName')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
      >
        <a-input value="Alex" />
      </a-form-item>
      <a-form-item
        :label="$t('transferAmount')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
      >
        <a-input prefix="￥" value="5000" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 17, offset: 7}">
        <a-button type="primary" @click="nextStep">{{$t('nextStep')}}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  i18n: require('./i18n'),
  methods: {
    nextStep () {
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>

</style>
