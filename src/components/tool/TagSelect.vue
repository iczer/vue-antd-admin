<template>
  <div class="tag-select">
    <tag-select-option>全部</tag-select-option>
    <slot></slot>
    <a class="trigger">展开<a-icon type="down"/></a>
  </div>
</template>

<script>
import ASelect from 'vue-antd-ui/es/select/index'
import ACheckableTag from 'vue-antd-ui/es/tag/CheckableTag'
import TagSelectOption from './TagSelectOption'
import AIcon from 'vue-antd-ui/es/icon/icon'
export default {
  name: 'TagSelect',
  Option: TagSelectOption,
  components: {AIcon, TagSelectOption, ACheckableTag, ASelect}
}
</script>

<style lang="less" scoped>
  .tag-select{
    user-select: none;
    margin-left: -8px;
    position: relative;
    overflow: hidden;
    max-height: 32px;
    line-height: 32px;
    padding-right: 50px;
  }
  .trigger{
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
