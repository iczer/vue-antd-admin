<template>
  <a-card :bordered="false" class="search-form">
    <a-form>
      <a-form-item
        label="所属类目"
      >
        <tag-select>
          <tag-select-option>类目一</tag-select-option>
          <tag-select-option>类目二</tag-select-option>
          <tag-select-option>类目三</tag-select-option>
          <tag-select-option>类目四</tag-select-option>
          <tag-select-option>类目五</tag-select-option>
          <tag-select-option>类目六</tag-select-option>
          <tag-select-option>类目七</tag-select-option>
          <tag-select-option>类目八</tag-select-option>
          <tag-select-option>类目九</tag-select-option>
          <tag-select-option>类目十</tag-select-option>
          <tag-select-option>类目十一</tag-select-option>
          <tag-select-option>类目十二</tag-select-option>
          <tag-select-option>类目十三</tag-select-option>
          <tag-select-option>类目十四</tag-select-option>
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
