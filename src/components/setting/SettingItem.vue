<template>
  <div class="setting-item">
    <h3 v-if="title" class="title">{{title}}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SettingItem',
  props: ['title']
}
</script>

<style lang="less" scoped>
  .setting-item{
    margin-bottom: 24px;
    .title{
      font-size: 14px;
      color: @title-color;
      line-height: 22px;
      margin-bottom: 12px;
    }
  }
</style>
