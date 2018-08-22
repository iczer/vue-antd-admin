<template>
  <div class="theme-color" :style="{backgroundColor: color}">
    <a-icon v-if="selected" type="check" />
  </div>
</template>

<script>
import AIcon from 'ant-design-vue/es/icon/icon'
export default {
  name: 'ThemeColor',
  components: {AIcon},
  props: ['color', 'selected']
}
</script>

<style lang="less" scoped>
  .theme-color{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    cursor: pointer;
    margin-right: 8px;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
</style>
