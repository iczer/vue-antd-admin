<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form>
      <a-form-item
        label="标题"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input placeholder="给目标起个名字" />
      </a-form-item>
      <a-form-item
        label="起止日期"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-range-picker style="width: 100%" />
      </a-form-item>
      <a-form-item
        label="目标描述"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-textarea rows="4" placeholder="请输入你阶段性工作目标"/>
      </a-form-item>
      <a-form-item
        label="衡量标准"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-textarea rows="4" placeholder="请输入衡量标准"/>
      </a-form-item>
      <a-form-item
        label="客户"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :required="false"
      >
        <a-input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"/>
      </a-form-item>
      <a-form-item
        label="邀评人"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :required="false"
      >
        <a-input placeholder="请直接 @姓名／工号，最多可邀请 5 人"/>
      </a-form-item>
      <a-form-item
        label="权重"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :required="false"
      >
        <a-input-number :min="0" :max="100"/>
        <span>%</span>
      </a-form-item>
      <a-form-item
        label="目标公开"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :required="false"
        help="客户、邀评人默认被分享"
      >
        <a-radio-group v-model="value">
          <a-radio :value="1">公开</a-radio>
          <a-radio :value="2">部分公开</a-radio>
          <a-radio :value="3">不公开</a-radio>
        </a-radio-group>
        <a-form-item>
          <a-select mode="multiple" v-if="value === 2">
            <a-select-option value="4">同事一</a-select-option>
            <a-select-option value="5">同事二</a-select-option>
            <a-select-option value="6">同事三</a-select-option>
          </a-select>
        </a-form-item>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: 'BasicForm',
  data () {
    return {
      desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
      value: 1
    }
  }
}
</script>

<style scoped>

</style>
