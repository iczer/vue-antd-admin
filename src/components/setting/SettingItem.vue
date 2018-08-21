<template>
  <div class="setting-item">
    <h3 class="title">{{title}}</h3>
    <div>
      <slot></slot>
    </div>
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
      color: rgba(0,0,0,.85);
      line-height: 22px;
      margin-bottom: 12px;
    }
  }
</style>
