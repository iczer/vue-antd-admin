<template>
  <a-checkable-tag class="tag-default" v-model="checked">
    <slot></slot>
  </a-checkable-tag>
</template>

<script>
import ACheckableTag from 'vue-antd-ui/es/tag/CheckableTag'
export default {
  name: 'TagSelectOption',
  components: {ACheckableTag},
  options: {
    size: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  data () {
    return {
      checked: false
    }
  }
}
</script>

<style lang="less" scoped>
  .tag-default{
    font-size: 14px;
    padding: 0 8px;
    height: auto;
    margin-right: 24px;
  }
</style>
