<template>
  <a-card :bordered="false" class="search-form">
    <a-form>
      <a-form-item
        label="所属类目"
        :labelCol="{span: 1}"
        :wrapperCol="{span: 23}"
      >
        <tag-select>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
          <tag-select-option>科目一</tag-select-option>
        </tag-select>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import ACard from 'vue-antd-ui/es/card/Card'
import AForm from 'vue-antd-ui/es/form/Form'
import AFormItem from 'vue-antd-ui/es/form/FormItem'
import AInput from 'vue-antd-ui/es/input/Input'
import TagSelect from '../../tool/TagSelect'

const TagSelectOption = TagSelect.Option

export default {
  name: 'SearchForm',
  components: {TagSelectOption, TagSelect, AInput, AFormItem, AForm, ACard}
}
</script>

<style lang="less" scoped>
  .search-form{
    margin-bottom: 24px;
  }
</style>
